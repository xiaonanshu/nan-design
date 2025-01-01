import React from 'react';
import { NanIconProps } from '../components/NanIcon/interface';
import NanIcon from '../components/NanIcon/NanIcon';
import ArrowLeftSvg from './svg/Arrow_Left';

const ArrowLeftIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={ArrowLeftSvg} name="arrow-left" {...props}></NanIcon>;
});

ArrowLeftIcon.displayName = 'ArrowLeftIcon';
export default ArrowLeftIcon;
