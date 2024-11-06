import React from 'react';
import NanIcon from '../components/NanIcon/NanIcon';
import SuccessSvg from './svg/Success';
import { NanIconProps } from '../components/NanIcon/interface';

const SuccessIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={SuccessSvg} name="primary-icon" {...props}></NanIcon>;
});

SuccessIcon.displayName = 'PrimaryIcon';

export default SuccessIcon;
