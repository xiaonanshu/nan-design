import React from 'react';
import { Type, Size, Shape, Status } from '../../utils/constant';

export interface ButtonBaseProps {
    type?: Type; //按钮类型：主要 | 次要 | 线框
    size?: Size; //按钮大小
    shape?: Shape; //按钮形状：全圆角 | 圆形 | 四方形 不设置为默认类型
    status?: Status; //按钮状态：主要 | 成功 | 警告 | 危险
    disabled?: boolean; //是否禁用
    loading?: boolean; //是否加载中
    children?: React.ReactNode; //
    onClick?: React.MouseEventHandler<HTMLElement>; //点击事件
    icon?: React.ReactNode; //图标
    loadingText?: string; //加载中状态显示的文字
}
