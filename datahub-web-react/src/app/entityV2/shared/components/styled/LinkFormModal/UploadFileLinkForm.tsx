import { Input } from '@components';
import { Form } from 'antd';
import { useCallback, useMemo, useState } from 'react';

import { FileDragAndDropArea } from './FileDragAndDropArea';
import { FileItem } from './FileItem';
import { LinkFormData } from './types';
import { useFileUploadHandler } from './useFileUploadHandler';

interface Props {
    initialValues?: Partial<LinkFormData>;
}

export function UploadFileLinkForm({ initialValues }: Props) {
    const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
    // TODO:: extract file name from fileUrl
    const [fileName, setFileName] = useState<string>(initialValues?.fileUrl ?? '');

    const form = Form.useFormInstance<LinkFormData>();

    const label = Form.useWatch('uploadLabel', form);
    const fileUrl = Form.useWatch('fileUrl', form);

    const shouldShowDragAndDropArea = useMemo(() => !fileUrl && !isFileUploading, [fileUrl, isFileUploading]);

    const setLabel = useCallback((newLabel: string) => form.setFieldValue('uploadLabel', newLabel), [form]);
    const setUrl = useCallback((newFileUrl: string | null) => form.setFieldValue('fileUrl', newFileUrl), [form]);

    const handleFileUpload = useFileUploadHandler({});

    const onFilesUpload = useCallback(
        async (files: File[]) => {
            const fileToUpload = files?.[0];
            if (!fileToUpload) return;

            setIsFileUploading(true);

            if (!label) setLabel(fileToUpload.name);
            setFileName(fileToUpload.name);

            const uploadedFileUrl = await handleFileUpload(fileToUpload);
            setUrl(uploadedFileUrl);
            setIsFileUploading(false);
        },
        [setLabel, setUrl, label, handleFileUpload],
    );

    const onFileRemove = useCallback(() => {
        setUrl('');
    }, []);

    return (
        <>
            {shouldShowDragAndDropArea && <FileDragAndDropArea onFilesUpload={onFilesUpload} />}
            {!shouldShowDragAndDropArea && fileUrl && <FileItem url={fileUrl} onClose={onFileRemove} />}

            <Form.Item
                data-testid="link-form-modal-file-url"
                name="fileUrl"
                initialValue={initialValues?.fileUrl}
                // hidden
            >
                <input type="text" />
            </Form.Item>

            <Form.Item
                data-testid="link-form-modal-upload-uploadLabel"
                name="uploadLabel"
                initialValue={initialValues?.label}
                rules={[
                    {
                        required: true,
                        message: 'A label is required.',
                    },
                ]}
            >
                <Input label="Label" placeholder="A short label for this link" />
            </Form.Item>
        </>
    );
}
