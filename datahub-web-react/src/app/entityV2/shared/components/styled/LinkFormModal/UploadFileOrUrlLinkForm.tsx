import { Form } from 'antd';
import { useCallback, useMemo } from 'react';

import ButtonTabs from '@app/homeV3/modules/shared/ButtonTabs/ButtonTabs';

import { UploadFileLinkForm } from './UploadFileLinkForm';
import { UrlLinkForm } from './UrlLinkForm';
import { LinkFormData, LinkFormVariant } from './types';

interface Props {
    initialValues?: Partial<LinkFormData>;
}

const TAB_KEY_URL = 'URL';
const TAB_KEY_UPLOAD_FILE = 'uploadFile';

export function UploadFileOrUrlLinkForm({ initialValues }: Props) {
    const form = Form.useFormInstance<LinkFormData>();

    const defaultTabKey = useMemo(() => {
        if (initialValues?.variant === LinkFormVariant.URL) {
            return TAB_KEY_URL;
        }

        return TAB_KEY_UPLOAD_FILE;
    }, [initialValues?.variant]);

    const onTabChanged = useCallback(
        (key: string) => {
            if (key === TAB_KEY_UPLOAD_FILE) {
                form.setFieldValue('variant', LinkFormVariant.UploadFile);
            } else if (key === TAB_KEY_URL) {
                form.setFieldValue('variant', LinkFormVariant.URL);
            }
        },
        [form],
    );

    const tabs = useMemo(
        () => [
            {
                key: TAB_KEY_UPLOAD_FILE,
                label: 'Upload',
                content: <UploadFileLinkForm initialValues={initialValues} />,
            },
            {
                key: TAB_KEY_URL,
                label: 'URL',
                content: <UrlLinkForm initialValues={initialValues} />,
            },
        ],
        [],
    );

    return <ButtonTabs tabs={tabs} onTabClick={onTabChanged} defaultKey={defaultTabKey} />;
}
