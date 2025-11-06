import { Form } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { useCallback } from 'react';

import { useAppConfig } from '@app/useAppConfig';

import { UploadFileOrUrlLinkForm } from './UploadFileOrUrlLinkForm';
import { UrlLinkForm } from './UrlLinkForm';
import { LinkFormData } from './types';

interface Props {
    form: FormInstance<LinkFormData>;
    initialValues?: Partial<LinkFormData>;
    onSubmit: (formData: LinkFormData) => void;
}

export function LinkForm({ form, initialValues, onSubmit }: Props) {
    const {
        config: {
            featureFlags: { documentationFileUploadV1 },
        },
    } = useAppConfig();

    const renderForm = useCallback(() => {
        if (!documentationFileUploadV1) {
            return <UploadFileOrUrlLinkForm initialValues={initialValues} />;
        } else {
            return <UrlLinkForm initialValues={initialValues} />;
        }
    }, [initialValues, documentationFileUploadV1]);

    return (
        <Form form={form} name="linkForm" onFinish={onSubmit} layout="vertical">
            {renderForm()}

            <Form.Item
                data-testid="link-modal-show-in-asset-preview"
                name="showInAssetPreview"
                valuePropName="checked"
                initialValue={initialValues?.showInAssetPreview}
                hidden
            >
                <input type="text" />
            </Form.Item>

            <Form.Item
                data-testid="link-modal-show-in-asset-preview"
                name="showInAssetPreview"
                valuePropName="checked"
                initialValue={initialValues?.showInAssetPreview}
                hidden
            >
                <input type="checkbox" />
            </Form.Item>
        </Form>
    );
}
