import { Button, Icon } from '@components';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import {
    extractFileNameFromUrl,
    getExtensionFromFileName,
    getFileIconFromExtension,
} from '@components/components/Editor/extensions/fileDragDrop/fileUtils';

const Container = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
`;

interface Props {
    url: string;
    onClose?: () => void;
}

export function FileItem({ url, onClose }: Props) {
    const name = extractFileNameFromUrl(url);
    const extension = getExtensionFromFileName(name || '');
    const icon = getFileIconFromExtension(extension || '');

    const closeHandler = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            onClose?.();
        },
        [onClose],
    );

    return (
        <Container>
            <Icon icon={icon} size="lg" source="phosphor" color="primary" />
            {name}
            {onClose && (
                <Button
                    icon={{
                        icon: 'X',
                        source: 'phosphor',
                        color: 'gray',
                    }}
                    variant="link"
                    onClick={closeHandler}
                />
            )}
        </Container>
    );
}
