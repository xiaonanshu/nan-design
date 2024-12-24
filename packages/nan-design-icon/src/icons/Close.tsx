import React from 'react';
import { NanIconProps } from '../components/NanIcon/interface';
import NanIcon from '../components/NanIcon/NanIcon';
import CloseSvg from './svg/Colse';

const CloseIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={CloseSvg} name="select-icon" {...props}></NanIcon>;
});

CloseIcon.displayName = 'CloseIcon';
export default CloseIcon;
