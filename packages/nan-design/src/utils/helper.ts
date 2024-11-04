export const isFunction = (val: unknown) => {
    return typeof val === 'function';
};

export const isArray = (val: unknown): val is string[] => {
    return Array.isArray(val);
};

export const isString = (val: unknown): val is string => {
    return typeof val === 'string';
};

export const isObject = (val: unknown): val is object => {
    return Object.prototype.toString.call(val) === '[object Object]';
};
