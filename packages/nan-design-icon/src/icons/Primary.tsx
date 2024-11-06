import React from 'react';
import NanIcon from '../components/NanIcon/NanIcon';
import PrimarySvg from './svg/Primary';
import { NanIconProps } from '../components/NanIcon/interface';

const PrimaryIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={PrimarySvg} name="primary-icon" {...props}></NanIcon>;
});

PrimaryIcon.displayName = 'PrimaryIcon';

export default PrimaryIcon;
