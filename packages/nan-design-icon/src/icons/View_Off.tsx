import React from 'react';
import NanIcon from '../components/NanIcon/NanIcon';
import { NanIconProps } from '../components/NanIcon/interface';
import ViewOffSvg from './svg/View_Off';

const ViewOffIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={ViewOffSvg} name="view_off-icon" {...props}></NanIcon>;
});

ViewOffIcon.displayName = 'ViewOffIcon';

export default ViewOffIcon;
