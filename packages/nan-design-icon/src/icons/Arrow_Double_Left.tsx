import React from 'react';
import { NanIconProps } from '../components/NanIcon/interface';
import NanIcon from '../components/NanIcon/NanIcon';
import ArrowDoubleLeftSvg from './svg/Arrow_Double_Left';

const ArrowDoubleLeftIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return (
        <NanIcon ref={ref} Icon={ArrowDoubleLeftSvg} name="arrow-double-left" {...props}></NanIcon>
    );
});

ArrowDoubleLeftIcon.displayName = 'ArrowDoubleLeftIcon';
export default ArrowDoubleLeftIcon;
