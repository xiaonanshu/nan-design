import React from 'react';
import { NanIconProps } from '../components/NanIcon/interface';
import NanIcon from '../components/NanIcon/NanIcon';
import ArrowDownSvg from './svg/Arrow_Down';

const ArrowDownIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={ArrowDownSvg} name="arrow-down" {...props}></NanIcon>;
});

ArrowDownIcon.displayName = 'ArrowDownIcon';
export default ArrowDownIcon;
