import { Form } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/macro';

import { Button, Checkbox, Input, Modal, Tabs, Text } from '@src/alchemy-components';
import useFileUpload from '@app/shared/hooks/useFileUpload';
import { UploadDownloadScenario } from '@types';
import { LinkFormData } from './types';
import { UrlLinkForm } from './UrlLinkForm';
import ButtonTabs from '@app/homeV3/modules/shared/ButtonTabs/ButtonTabs';
import { UploadFileOrUrlLinkForm } from './UploadFileOrUrlLinkForm';
import { LinkForm } from './LinkForm';

const FooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const FooterButtonsContainer = styled.div`
    display: flex;
    gap: 16px;
    flex-direction: row;
    align-items: center;
`;

const FooterCheckboxContainer = styled.div`
    display: flex;
    gap: 4px;
    flex-direction: row;
    align-items: center;
`;

const FooterCheckboxLabel = styled(Text)`
    cursor: pointer;
`;


interface Props {
    open: boolean;
    initialValues?: Partial<LinkFormData>;
    variant: 'create' | 'update';
    onSubmit: (formData: LinkFormData) => void;
    onCancel: () => void;
}

export const LinkFormModal = ({ open, initialValues, variant, onSubmit, onCancel }: Props) => {
    const [shouldBeShownInAssetPreview, setIsShowInAssetPreview] = useState<boolean>(
        !!initialValues?.showInAssetPreview,
    );
    const [form] = Form.useForm<LinkFormData>();

    useFileUpload({ scenario: UploadDownloadScenario.AssetDocumentation, })

    const onCancelHandler = useCallback(() => {
        onCancel();
    }, [onCancel]);

    // Reset form state to initial values when the form opened/closed
    useEffect(() => {
        form.resetFields();
        setIsShowInAssetPreview(!!initialValues?.showInAssetPreview);
    }, [open, form, initialValues?.showInAssetPreview]);

    // Sync shouldBeShownInAssetPreview with form field as this checkbox out of scope of form (in the modal's footer)
    useEffect(() => {
        const formValue = form.getFieldValue('showInAssetPreview');
        if (shouldBeShownInAssetPreview !== formValue) {
            form.setFieldValue('showInAssetPreview', shouldBeShownInAssetPreview);
        }
    }, [form, shouldBeShownInAssetPreview]);

    const title = useMemo(() => (variant === 'create' ? 'Add Link' : 'Update Link'), [variant]);
    const submitButtonText = useMemo(() => (variant === 'create' ? 'Create' : 'Update'), [variant]);

    return (
        <Modal
            title={title}
            open={open}
            destroyOnClose
            onCancel={onCancelHandler}
            footer={
                <FooterContainer>
                    <FooterCheckboxContainer>
                        <Checkbox
                            isChecked={shouldBeShownInAssetPreview}
                            setIsChecked={setIsShowInAssetPreview}
                            size="sm"
                            dataTestId="link-form-modal-show-in-asset-preview"
                        />
                        <FooterCheckboxLabel
                            color="gray"
                            onClick={() => setIsShowInAssetPreview(!shouldBeShownInAssetPreview)}
                        >
                            Add to asset header1
                        </FooterCheckboxLabel>
                    </FooterCheckboxContainer>
                    <FooterButtonsContainer>
                        <Button variant="text" onClick={onCancelHandler}>
                            Cancel
                        </Button>
                        <Button data-testid="link-form-modal-submit-button" form="linkForm" key="submit">
                            {submitButtonText}
                        </Button>
                    </FooterButtonsContainer>
                </FooterContainer>
            }
        >
            <LinkForm form={form} onSubmit={onSubmit} />
        </Modal>
    );
};
