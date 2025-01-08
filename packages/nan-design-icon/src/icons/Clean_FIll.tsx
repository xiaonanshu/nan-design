import React from 'react';
import { NanIconProps } from '../components/NanIcon/interface';
import NanIcon from '../components/NanIcon/NanIcon';
import CleanFillSvg from './svg/Clean_Fill';

const CleanFillIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={CleanFillSvg} name="clean-fill-icon" {...props}></NanIcon>;
});

CleanFillIcon.displayName = 'CleanFillIcon';
export default CleanFillIcon;
