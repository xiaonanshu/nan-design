import React from 'react';

export interface SwitchProps {
    checked?: boolean; // 状态（开 or 关）
    defaultChecked?: boolean; // 默认状态
    size?: 's' | 'm'; // 大小
    disabled?: boolean; // 禁用
    checkedColor?: string; // 选中状态的背景色
    unCheckedColor?: string; // 未选中状态的背景色
    checkedNode?: React.ReactNode; //选中状态下的内容
    unCheckedNode?: React.ReactNode; // 未选中状态下的内容
    onChange?: (checked: boolean) => void; // 开关状态改变时执行
    onClick?: (checked: boolean, e: React.MouseEvent<HTMLButtonElement>) => void;
}
