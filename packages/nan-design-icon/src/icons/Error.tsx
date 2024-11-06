import React from 'react';
import NanIcon from '../components/NanIcon/NanIcon';
import ErrorSvg from './svg/Error';
import { NanIconProps } from '../components/NanIcon/interface';

const ErrorIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={ErrorSvg} name="error-icon" {...props}></NanIcon>;
});

ErrorIcon.displayName = 'ErrorIcon';

export default ErrorIcon;
