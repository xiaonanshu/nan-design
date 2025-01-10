import React from 'react';
import { NanIconProps } from '../components/NanIcon/interface';
import NanIcon from '../components/NanIcon/NanIcon';
import DeleteSvg from './svg/Delete';

const DeleteIcon = React.forwardRef<HTMLSpanElement, NanIconProps>((props, ref) => {
    return <NanIcon ref={ref} Icon={DeleteSvg} name="delete-icon" {...props}></NanIcon>;
});

DeleteIcon.displayName = 'DeleteIcon';
export default DeleteIcon;
