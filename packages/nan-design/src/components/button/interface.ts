import React from 'react';

export interface ButtonBaseProps {
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
}
