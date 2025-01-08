// 获取选中的value和option
import React, { useEffect } from 'react';
import { Option } from '../interface';
import getSelected from '../utils/getSelected';

export const useGetSelected = <T extends Option>(options: T[], defaultValue: T['value'][]) => {
    const selected = React.useRef<T[]>(getSelected(defaultValue, options || []));

    const setSelectedOptions = (option: T | null, depth: number): void => {
        if (option === null || depth === 0) {
            selected.current = [];
            return;
        }
        selected.current = selected.current.slice(0, depth - 1);

        const children: T[] =
            selected.current.length > 0
                ? (selected.current[selected.current.length - 1].children as T[])
                : options;
        if (!children) {
            return;
        }
        for (let i = 0; i < children.length; i++) {
            if (option.value !== undefined && children[i].value !== undefined) {
                if (option.value === children[i].value && option.label === children[i].label) {
                    selected.current.push(children[i]);
                    break;
                }
            } else {
                if (option.label === children[i].label) {
                    selected.current.push(children[i]);
                }
            }
        }
    };
    return [selected, setSelectedOptions] as const;
};
