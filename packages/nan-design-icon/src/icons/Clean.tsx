import React from 'react';
import { NanIconProps } from '../components/NanIcon/interface';
import NanIcon from '../components/NanIcon/NanIcon';
import CleanSvg from './svg/Clean';

const CleanIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={CleanSvg} name="clean-icon" {...props}></NanIcon>;
});

CleanIcon.displayName = 'CleanIcon';
export default CleanIcon;
