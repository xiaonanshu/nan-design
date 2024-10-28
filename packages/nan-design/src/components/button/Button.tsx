import React from 'react';
import { hello } from '@nan-design/shared';
import { ButtonBaseProps } from './interface';
import { isFunction } from '../../utils/helper';

const Button: React.FC<ButtonBaseProps> = (props) => {
    const { disabled = false, children, ...restProps } = props;
    console.log(props.onClick);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const { onClick } = props;
        if (isFunction(onClick)) {
            e.preventDefault();
            // onClick(e);
            hello('nana');
        } else {
            hello('nan');
        }
    };
    const buttonProps = {
        disabled,
        ...restProps,
        onClick: handleClick
    };

    return <button {...buttonProps}>{children}</button>;
};

export { Button };
