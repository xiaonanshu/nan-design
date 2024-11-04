import React from 'react';
import { FlexProps } from './interface';
import { createCssSCope } from '../../utils/bem';

const Flex: React.FC<FlexProps> = (props) => {
    const { children, ...restProps } = props;

    const bem = createCssSCope('flex');
    const className = bem();

    const flexProps = {
        className,
        ...restProps
    };
    return <div {...flexProps}>{children}</div>;
};

export { Flex };
