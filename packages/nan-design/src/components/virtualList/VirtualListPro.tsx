import React, { ReactElement } from 'react';
import { VirtualListProProps } from './interface';
import { createCssSCope } from '../../utils/bem';
const borderBottom = 1;

const VirtualList = <T,>(props: VirtualListProProps<T>) => {
    const {
        data = [],
        height = 200,
        estimatedHeight = 20,
        renderItem,
        gap = 0,
        onscroll,
        itemKey
    } = props;
    // 位置信息数据结构
    interface Postiotion {
        height: number;
        index: number;
        top: number;
        bottom: number;
    }

    const [startIndex, setStartIndex] = React.useState<number>(0);
    const [positions, setPositions] = React.useState<Postiotion[]>([]);
    const [scrollTop, setScrollTop] = React.useState<number>(0);
    const bem = createCssSCope('virtual-list');
    const totalGap = React.useMemo(() => {
        return gap + borderBottom;
    }, [gap]);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);

    // 初始化positions
    const initPositions = () => {
        const oldLen = positions.length;
        const bottom = oldLen === 0 ? 0 : positions[oldLen - 1].bottom;
        const newPositions = data.map((item, index) => {
            if (index < positions.length) {
                return positions[index];
            } else {
                return {
                    height: estimatedHeight + totalGap,
                    index: index,
                    top: bottom + (index - oldLen) * (estimatedHeight + totalGap),
                    bottom: bottom + (index + 1 - oldLen) * (estimatedHeight + totalGap)
                };
            }
        });
        setPositions(newPositions);
    };

    // 列表高度，撑开滚动条
    const listHeight = React.useMemo(() => {
        const len = positions.length;
        if (len !== 0) {
            return positions[len - 1].bottom;
        }
        return data.length * (estimatedHeight + totalGap);
    }, [data, positions, estimatedHeight, totalGap]);

    // 设置展示条数
    const limit = React.useMemo(() => {
        let sum = 0;
        let i = 0;
        let begin = startIndex;
        while (begin < positions.length) {
            sum += positions[begin].height;
            if (sum >= height) {
                break;
            }
            i++;
            begin++;
        }
        return i;
    }, [positions, startIndex]);

    const endIndex = React.useMemo(
        function () {
            return Math.min(startIndex + limit + 1, data.length - 1);
        },
        [startIndex, limit]
    );

    /**
     * 根据当前滚动距离，计算第一个可见项索引
     * 使用二分查找优化
     * @param positions
     * @param scrollTop
     */
    const CompareResult = {
        eq: 1,
        lt: 2,
        gt: 3
    };
    const getStartIndex = function (positions: Postiotion[], scrollTop: any) {
        let idx =
            binarySearch(positions, scrollTop, (currentValue: any, targetValue: any) => {
                // 传入的比较方法，通过比较顶部距离与最上方节点的bottom值来决定列表的第一个元素
                const currentCompareValue = currentValue.bottom;
                if (currentCompareValue === targetValue) {
                    return CompareResult.eq;
                }
                if (currentCompareValue < targetValue) {
                    return CompareResult.lt;
                }
                return CompareResult.gt;
            }) || 0;
        const targetItem = positions[idx];
        if (targetItem.bottom < scrollTop) {
            idx += 1;
        }
        return idx;
    };

    // 二分查找核心算法
    const binarySearch = function (list: any, value: any, compareFunc: any) {
        let start = 0;
        let end = list.length - 1;
        let tempIndex = null;
        while (start <= end) {
            tempIndex = Math.floor((start + end) / 2);
            const midValue = list[tempIndex];
            const compareRes = compareFunc(midValue, value);
            // 一般情况是找不到完全相等的值，只能找到最接近的值
            if (compareRes === CompareResult.eq) {
                return tempIndex;
            }
            if (compareRes === CompareResult.lt) {
                start = tempIndex + 1;
            } else if (compareRes === CompareResult.gt) {
                end = tempIndex - 1;
            }
        }
        return tempIndex;
    };

    /**
     * 更新位置信息,设置真实信息
     */
    const updatePositions = () => {
        const nodes = listRef.current!.childNodes; // 获取当前所有渲染的列表项
        if (!nodes || !nodes.length || !positions.length) {
            return;
        }

        const newPositions = [...positions];
        let needUpdate = false;
        nodes.forEach((node) => {
            const newHeight = (node as HTMLElement).clientHeight;
            //获取节点ID，映射positions中的位置
            const nodeId = Number((node as HTMLElement).dataset.nanVirtuallistId);
            if (isNaN(nodeId)) {
                return;
            }
            const oldHeight = positions[nodeId].height;
            // 高度发生变化，更新positions
            const dHeight = newHeight - oldHeight;
            if (dHeight) {
                needUpdate = true;
                positions[nodeId].height = newHeight;
                // 当前节点与底部距离 = 上一个节点底部与容器顶部距离 + 当前节点高度
                positions[nodeId].bottom =
                    nodeId > 0
                        ? positions[nodeId - 1].bottom + positions[nodeId].height
                        : positions[nodeId].height;
                // 当前节点与顶部距离 = 上一个节点底部与容器顶部距离
                positions[nodeId].top = nodeId > 0 ? positions[nodeId - 1].bottom : 0;
                // 更改一个节点就需要更改后续所有节点。
                for (let j = nodeId + 1; j < positions.length; j++) {
                    positions[j].top = positions[j - 1].bottom;
                    positions[j].bottom += dHeight;
                }
            }
        });
        if (needUpdate) {
            setPositions(newPositions);
        }
    };

    //使用translate来校正滚动位置
    const getTransfrom = React.useCallback(() => {
        // return {};
        if (positions.length === 0) {
            return {};
        }
        if (endIndex >= positions.length) {
            return {};
        }
        return {
            // 改变空白填充区域的样式，起始元素的top值就代表起始元素距顶部的距离，可以用来充当paddingTop
            paddingTop: `${positions[startIndex].top}px`,
            // 最后一个元素的bottom值与endIndex对应元素的bottom值的差值可以用来充当paddingBottom的值
            paddingBottom: `${positions[positions.length - 1].bottom - positions[endIndex].bottom}px`
        };
    }, [positions, startIndex]);

    // 处理滚动事件
    const handleScroll = function (e: any) {
        if (e.target !== containerRef.current) return;
        const scrollTop = e.target.scrollTop;
        setScrollTop(scrollTop);

        // 根据当前偏移量，获取当前最上方的元素
        // 因为滚轮一开始一定是往下的，所以上方的元素高度与顶部和底部的距离等都是被缓存的
        const currentStartIndex = getStartIndex(positions, scrollTop);
        // console.log(currentStartIndex);
        // 设置索引
        if (currentStartIndex !== startIndex) {
            setStartIndex(currentStartIndex);
        }
        onscroll?.(e);
    };

    // 初始化位置信息
    React.useEffect(() => {
        if (!data.length) {
            return;
        }
        initPositions(); // 仅在 data 改变时执行
    }, [data]);

    React.useEffect(() => {
        updatePositions();
    }, [scrollTop, data]);

    // 索引更改后重新渲染列表
    const renderList = React.useMemo(
        function () {
            const rows = [];
            for (let i = startIndex; i <= endIndex; i++) {
                const item = data[i];
                const node = renderItem?.(data[i], i) as ReactElement;
                const key = node.key;
                const { className, style, ...restProps } = node!.props;
                const prop = {
                    'data-nan-virtuallist-id': i,
                    className: `${bem('item')}`,
                    style: { padding: `${gap / 2}px 0`, ...style },
                    ...restProps
                };
                rows.push(
                    React.cloneElement(node, {
                        key: key || (itemKey ? (item as any)[itemKey] || i : i),
                        ...node.props,
                        ...prop
                    })
                );
            }
            return rows;
        },
        [startIndex, endIndex]
    );

    return (
        <div
            ref={containerRef}
            onScroll={(e) => {
                handleScroll(e);
            }}
            className={bem()}
            style={{ height: height, overflowY: 'auto' }}
        >
            <div
                ref={listRef}
                className={bem('inner')}
                style={{ height: listHeight, ...getTransfrom() }}
            >
                {renderList}
                {data.length === 0 && (
                    <div
                        className={bem('item')}
                        style={{ padding: `${gap / 2}px 0`, height: estimatedHeight + gap }}
                    >
                        加载中
                    </div>
                )}
            </div>
        </div>
    );
};

const VirtualListPro = React.memo(VirtualList);

export { VirtualListPro };
