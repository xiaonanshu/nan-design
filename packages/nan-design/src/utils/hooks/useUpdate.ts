// 强制刷新
import React from 'react';

export const useUpdate = () => {
    const [, update] = React.useState({});
    return React.useCallback(() => update({}), []);
};
