import React, { useEffect } from 'react';

export const useEventListener = <T extends Event>(
    node: HTMLElement | Window | null,
    event: string,
    callback: (event: T) => void,
    useCapture: boolean = false
) => {
    useEffect(() => {
        if (!node) {
            return;
        }
        const eventListener = (event: Event) => callback(event as T);
        node.addEventListener(event, eventListener, useCapture);

        return () => {
            node.removeEventListener(event, eventListener, useCapture);
        };
    }, [node, event, callback, useCapture]);
};
