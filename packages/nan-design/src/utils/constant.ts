//类型  主要 | 次要 | 线框
export const TYPES = ['primary', 'secondary', 'outline'];
export type Type = (typeof TYPES)[number];

// 大小 24px | 32px | 36px | 48px（高度）
export const SIZES = ['s', 'm', 'l', 'xl'] as const;
export type Size = (typeof SIZES)[number];

//形状 默认类型 | 全圆角 | 圆形 | 四方形
export const SHAPES = ['default', 'round', 'circle', 'square'];
export type Shape = (typeof SHAPES)[number];

//状态
export const STATUS = ['primary', 'success', 'warning', 'danger'];
export type Status = (typeof STATUS)[number];
