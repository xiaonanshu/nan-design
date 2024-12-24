import { useCallback, useEffect, useState } from 'react';

// 合并固定值与默认值状态
export const useMergeState = <T>(value: T | undefined, defaultValue: T) => {
    // 是否有固定值,如果有，那么状态一直为value,后续不能修改状态；如果没有，初始状态为defaultValue,后续可以修改状态
    const isControlled = value !== undefined;
    const [state, setState] = useState<T>(() => value ?? defaultValue);
    const setMergeState = useCallback(
        (value: T) => {
            if (!isControlled) {
                setState(value);
            }
        },
        [isControlled]
    );

    useEffect(() => {
        if (isControlled) {
            setState(value);
        }
    }, [value, isControlled]);

    return [state, setMergeState] as const;
};
