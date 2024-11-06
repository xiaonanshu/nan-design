import React from 'react';

export interface NanIconProps extends React.HTMLProps<HTMLSpanElement> {
    className?: string; //类名
    rotate?: number; //旋转角度
    svgRef?: React.Ref<SVGSVGElement>;
}

export interface NanIconComponentProps extends NanIconProps {
    name?: string; //名称
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>; //icon组件
}
