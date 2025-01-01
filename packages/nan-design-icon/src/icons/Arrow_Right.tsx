import React from 'react';
import { NanIconProps } from '../components/NanIcon/interface';
import NanIcon from '../components/NanIcon/NanIcon';
import ArrowRightSvg from './svg/Arrow_Right';

const ArrowRightIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={ArrowRightSvg} name="arrow-right" {...props}></NanIcon>;
});

ArrowRightIcon.displayName = 'ArrowRightIcon';
export default ArrowRightIcon;
