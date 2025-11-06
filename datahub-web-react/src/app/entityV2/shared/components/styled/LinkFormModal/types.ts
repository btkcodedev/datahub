export enum LinkFormVariant {
    URL = 'url',
    UploadFile = 'uploadFile'
}

export interface LinkFormData {
    variant: LinkFormVariant;

    url: string;
    label: string;

    fileUrl: string;
    uploadLabel: string;

    showInAssetPreview: boolean;
}
