import React from 'react';
import { FlexProps } from './interface';
import { createCssSCope } from '../../utils/bem';
import { isGap } from './constant';

const Flex: React.FC<FlexProps> = (props) => {
    const {
        vertical = false,
        wrap = 'no-wrap',
        justify,
        align,
        gap,
        children,
        ...restProps
    } = props;

    const baseStyle: React.CSSProperties = !isGap(gap)
        ? {
              gap: gap
          }
        : {};

    const gapValue = isGap(gap) ? gap : '';
    const modifiers: string[] = [wrap, gapValue];
    if (justify) {
        modifiers.push(`justify-${justify}`);
    }
    if (align) {
        modifiers.push(`align-${align}`);
    }
    const bem = createCssSCope('flex');
    const className = bem(modifiers, {
        vertical
    });

    const style: React.CSSProperties = {
        ...baseStyle,
        ...(restProps as { style: React.CSSProperties }).style
    };

    const flexProps = {
        className,
        ...restProps,
        style
    };
    return <div {...flexProps}>{children}</div>;
};

export { Flex };
