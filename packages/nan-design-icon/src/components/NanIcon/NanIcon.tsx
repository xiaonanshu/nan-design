import React from 'react';
import { NanIconComponentProps } from './interface';

// 组合类名
const clsx = (...classNames: (string | undefined)[]): string => {
    return classNames.filter(Boolean).join(' ');
};

// 生成style
const generateRotateStyle = (rotate?: number): React.CSSProperties => {
    return {
        transform: `rotate(${rotate}deg)`
    };
};

const NanIcon = React.forwardRef<HTMLSpanElement, NanIconComponentProps>(
    function NanIcon(props, ref) {
        const { className, rotate, name, Icon, style, svgRef, ...restProps } = props;

        const iconStyle = generateRotateStyle(rotate);

        return (
            <span
                className={clsx('nan-icon', className)}
                // style={{ display: 'inline-flex', ...style }}
                style={style}
                aria-label={name}
                {...restProps}
                ref={ref}
            >
                <Icon style={iconStyle} ref={svgRef}></Icon>
            </span>
        );
    }
);

export default NanIcon;
