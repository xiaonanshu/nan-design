import React from 'react';
import NanIcon from '../components/NanIcon/NanIcon';
import { NanIconProps } from '../components/NanIcon/interface';
import ViewSvg from './svg/View';

const ViewIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={ViewSvg} name="view-icon" {...props}></NanIcon>;
});

ViewIcon.displayName = 'ViewIcon';

export default ViewIcon;
