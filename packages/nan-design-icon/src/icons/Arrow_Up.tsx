import React from 'react';
import { NanIconProps } from '../components/NanIcon/interface';
import NanIcon from '../components/NanIcon/NanIcon';
import ArrowUpSvg from './svg/Arrow_Up';

const ArrowUpIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={ArrowUpSvg} name="arrow-down" {...props}></NanIcon>;
});

ArrowUpIcon.displayName = 'ArrowUpIcon';
export default ArrowUpIcon;
