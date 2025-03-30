import React from 'react';
import { Wrap, Justify, Align, Gap } from './constant';
export interface FlexProps {
    vertical?: boolean; // 主轴方向是否为垂直方向
    wrap?: Wrap; // 是否换行
    justify?: Justify; // 主轴对齐方式
    align?: Align; // 交叉轴对齐方式
    gap?: Gap | number | string; // 间隔
    children?: React.ReactNode;
    style?: React.CSSProperties;
}
