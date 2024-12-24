import React from 'react';
import { NanIconProps } from '../components/NanIcon/interface';
import NanIcon from '../components/NanIcon/NanIcon';
import SelectSvg from './svg/Select';

const SelectIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={SelectSvg} name="select-icon" {...props}></NanIcon>;
});

SelectIcon.displayName = 'SelectIcon';
export default SelectIcon;
