import React from 'react';
import { NanIconProps } from '../components/NanIcon/interface';
import NanIcon from '../components/NanIcon/NanIcon';
import ArrowDoubleRightSvg from './svg/Arrow_Double_Right';

const ArrowDoubleRightIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return (
        <NanIcon ref={ref} Icon={ArrowDoubleRightSvg} name="arrow-double-left" {...props}></NanIcon>
    );
});

ArrowDoubleRightIcon.displayName = 'ArrowDoubleRightIcon';
export default ArrowDoubleRightIcon;
