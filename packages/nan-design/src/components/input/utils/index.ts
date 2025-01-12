import React from 'react';
/**
 * 克隆一个事件对象，并将其目标元素替换为指定的目标元素
 * @param target
 * @param Event
 */
const cloneEvent = (target: HTMLInputElement, event: React.ChangeEvent | React.MouseEvent) => {
    const currentTarget = target.cloneNode(true);
    const newEvent = Object.create(event, {
        target: { value: currentTarget }
    });

    return newEvent;
};
/**
 * 清除所有的时候触发change事件
 * e可以是changeEvent是为了保持普通change和clearAll时传给onChange的event类型统一，所以对普通change也需要通过此函数处理
 * @param targetElement
 * @param e
 * @param onChange
 * @returns
 */
export const resolveOnChange = <E extends HTMLInputElement>(
    targetElement: E,
    e: React.ChangeEvent | React.MouseEvent,
    onChange: undefined | ((event: React.ChangeEvent<E>) => void)
) => {
    if (!onChange) {
        return;
    }
    const event = cloneEvent(targetElement, e);
    onChange(event as React.ChangeEvent<E>);
};
