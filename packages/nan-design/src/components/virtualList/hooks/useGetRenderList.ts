import { useMemo } from 'react';
export const useGetRenderList = (renderItem, data, startIndex, endIndex, bem) => {
    return useMemo(
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
};
