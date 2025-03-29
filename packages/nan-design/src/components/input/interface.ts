import { ReactNode } from 'react';
import { Size } from '../../utils/constant';

export interface InputProp extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size' | 'prefix'> {
    type?: string;
    addonAfter?: ReactNode; // 后缀
    addonBefore?: ReactNode; // 前缀
    allowClear?: boolean; // 允许清除
    defaultValue?: string; // 默认值
    maxLength?: number; //最大长度
    prefix?: ReactNode; // 前缀图标
    suffix?: ReactNode; // 后缀图标
    showCount?: boolean; // 显示字数
    disabled?: boolean; //禁用
    size?: Size; // 大小
    value?: string; // 值
    status?: 'error' | 'warning'; //校验状态
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 输入框内容变化时的回调
    onPressEnter?: () => void; // 按下Enter的回调
    onClear?: () => void; // 按下清除按钮的回调
    style?: React.CSSProperties;
}

export interface InputPasswordProp extends InputProp {
    visibilityToggle?: boolean; // 是否可以切换显隐
    iconRender?: (visible: boolean) => ReactNode; // 自定义切换显隐按钮
}

export interface InputComponentType {
    Password?: InputPasswordProp;
}
