import { isFileUrl } from '@components/components/Editor/extensions/fileDragDrop';

import { InstitutionalMemoryMetadata } from '@types';

import { LinkFormData, LinkFormVariant } from './types';

export function getInitialLinkFormDataFromInstitutionMemory(
    institutionalMemoryMetadata: InstitutionalMemoryMetadata,
): LinkFormData {
    const url = institutionalMemoryMetadata.url;
    const label = institutionalMemoryMetadata.label || institutionalMemoryMetadata.description;
    const showInAssetPreview = !!institutionalMemoryMetadata.settings?.showInAssetPreview;

    // Institutional memory has a link to an uploaded file
    if (isFileUrl(url)) {
        return {
            variant: LinkFormVariant.UploadFile,
            url: '',
            fileUrl: url,
            showInAssetPreview,
            label,
        };
    }

    // Institutional memory has an usual url
    return {
        variant: LinkFormVariant.URL,
        fileUrl: '',
        url,
        showInAssetPreview,
        label,
    };
}
