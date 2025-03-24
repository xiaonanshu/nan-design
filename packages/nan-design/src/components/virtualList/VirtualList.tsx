import React, { ReactElement } from 'react';
import { createCssSCope } from '../../utils/bem';
import { VirtualListPro } from './VirtualListPro';
import { VirtualListProProps } from './interface';
import './style';

const VirtualList = <T,>(props: VirtualListProProps<T>) => {
    const {
        data = [],
        height = 400,
        itemHeight = 20,
        renderItem,
        requestMore,
        itemKey,
        gap = 0,
        onscroll,
        fixedHeight = true
    } = props;

    const loadingIcon = (
        <span className="nan-virtual-list-loading-icon">
            <svg viewBox="0 0 1024 1024" fill="currentColor" width="1em" height="1em">
                <path d="M512 170.666667C323.477333 170.666667 170.666667 323.477333 170.666667 512s152.810667 341.333333 341.333333 341.333333 341.333333-152.810667 341.333333-341.333333h85.333334c0 235.648-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333v85.333334z"></path>
            </svg>
        </span>
    );

    const bem = createCssSCope('virtual-list');

    const [startIndex, setStartIndex] = React.useState(0); // 开始渲染的下标
    const [endIndex, setEndIndex] = React.useState(0); // 结束渲染的下标
    const [scrollTop, setScrollTop] = React.useState(0); // 滚动位置
    const containerRef = React.useRef<HTMLDivElement>(null);

    /**
     * 计算可视区域的开始和结束下标
     */
    const calculateItemCount = React.useCallback(() => {
        if (!containerRef.current) return;
        const scroll = containerRef.current?.scrollTop || 0;
        const singleHeight = itemHeight + gap;
        const beginIndex = Math.max(0, Math.floor(scroll / singleHeight) - 1);
        const endIndex = beginIndex + Math.ceil(height / singleHeight) + 1;
        const count = Math.ceil(height / singleHeight);
        setStartIndex(beginIndex);
        setEndIndex(endIndex);
        setScrollTop(scroll - (scroll % singleHeight));
    }, [height, itemHeight, gap]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        // console.log(e.currentTarget);
        // 当滚动到底部时，请求更多数据
        // e.currentTarget.scrollHeight - e.currentTarget.scrollTop - height 表示滚动条距离底部的距离
        // 当滚动条距离底部的距离小于等于1时再请求更多数据。可以避免滚动到底部时，请求多次数据
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - height) <= 1) {
            requestMore?.();
        }
        onscroll?.(e);
        if (fixedHeight) {
            requestAnimationFrame(calculateItemCount);
        }
    };

    React.useEffect(() => {
        if (data.length === 0) {
            requestMore?.();
        }
        calculateItemCount();
    }, [data]);

    if (!fixedHeight) {
        const { onscroll, ...restProps } = props;
        return (
            <VirtualListPro
                onscroll={handleScroll}
                {...(restProps as VirtualListProProps<unknown>)}
            ></VirtualListPro>
        );
    }

    return (
        <div
            className={bem()}
            style={{ height, overflow: 'auto' }}
            onScroll={(e) => {
                handleScroll(e);
            }}
            ref={containerRef}
        >
            <div
                style={{
                    height: data.length * (itemHeight + gap)
                }}
            >
                <div
                    className={bem('inner')}
                    style={{
                        height: height,
                        transform: `translate3d(0, ${scrollTop}px, 0)`
                    }}
                >
                    {data.slice(startIndex, endIndex).map((item: T, index) => {
                        const node = renderItem?.(item, index) as ReactElement;
                        const key = node.key;
                        const { className, style, ...restProps } = node!.props;
                        const { height, padding, ...restStyle } = style;
                        const prop = {
                            'data-nan-virtuallist-id': index,
                            className: `${bem('item')}`,
                            style: { padding: `${gap / 2}px 0`, ...restStyle },
                            ...restProps
                        };
                        return React.cloneElement(node, {
                            key: key || (itemKey ? (item as any)[itemKey] || index : index),
                            ...node.props,
                            ...prop
                        });
                    })}
                    {endIndex >= data.length && (
                        <div
                            className={bem('item')}
                            style={{ padding: `${gap / 2}px 0`, height: itemHeight + gap }}
                        >
                            加载中{loadingIcon}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export { VirtualList };
