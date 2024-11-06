import React from 'react';
import NanIcon from '../components/NanIcon/NanIcon';
import WarningSvg from './svg/Warning';
import { NanIconProps } from '../components/NanIcon/interface';

const WarningIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={WarningSvg} name="primary-icon" {...props}></NanIcon>;
});

WarningIcon.displayName = 'WarningIcon';

export default WarningIcon;
