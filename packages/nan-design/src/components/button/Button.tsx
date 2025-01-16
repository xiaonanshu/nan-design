import React from 'react';
import { ButtonBaseProps } from './interface';
import { createCssSCope } from '../../utils/bem';
import { isFunction } from '../../utils/helper';

const Button: React.FC<ButtonBaseProps> = (props) => {
    const {
        htmlType = 'button',
        type = 'primary',
        size = 'l',
        shape = 'default',
        status,
        disabled = false,
        children,
        icon,
        loading = false,
        loadingText,
        ...restProps
    } = props;

    const loadingIcon = (
        <span className="nan-button-loading-icon">
            <svg viewBox="0 0 1024 1024" fill="currentColor" width="1em" height="1em">
                <path d="M512 170.666667C323.477333 170.666667 170.666667 323.477333 170.666667 512s152.810667 341.333333 341.333333 341.333333 341.333333-152.810667 341.333333-341.333333h85.333334c0 235.648-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333v85.333334z"></path>
            </svg>
        </span>
    );

    //生成类名
    const bem = createCssSCope('button');
    const className = bem([type, size, shape, status], {
        disabled,
        loading
    });

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const { onClick } = props;
        if (isFunction(onClick) && !disabled) {
            e.preventDefault();
            onClick(e);
        }
    };

    const buttonProps = {
        type: htmlType,
        disabled,
        className,
        onClick: handleClick,
        ...restProps
    };

    return (
        <button {...buttonProps}>
            {loading && loadingIcon}
            {icon && !loading && <span className="nan-icon">{icon}</span>}
            {loading ? loadingText : children}
        </button>
    );
};

export { Button };
