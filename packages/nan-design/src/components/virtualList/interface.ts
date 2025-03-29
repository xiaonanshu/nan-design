import React from 'react';

export interface VirtualListProps<T> {
    data?: T[]; // 数据
    height?: number; // 虚拟列表高度
    itemHeight?: number; // 每个元素的高度
    renderItem?: (item: T, index: number) => React.ReactNode; // 渲染每个元素
    requestMore?: () => void; // 请求更多数据
    itemKey?: string; // 每个元素的key
    gap?: number; // 子元素间隔
    onscroll?: (e: React.UIEvent<HTMLDivElement>) => void; // 滚动事件
    fixedHeight?: boolean; //是否定高
    style?: React.CSSProperties;
}

export interface VirtualListProProps<T> extends VirtualListProps<T> {
    estimatedHeight?: number;
}
