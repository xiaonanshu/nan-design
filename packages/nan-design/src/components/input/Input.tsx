import React from 'react';
import { InputProp } from './interface';
import { createCssSCope } from '../../utils/bem';
import { useMergeState } from '../../utils/hooks/useMergeState';
import { CleanFillIcon } from '@nan-design/icons';
import { useEventListener } from '../../utils/hooks/useEventListener';
import { resolveOnChange } from './utils';

const Input: React.FC<InputProp> = (prop) => {
    const {
        addonAfter,
        addonBefore,
        allowClear = false,
        defaultValue = '',
        maxLength,
        prefix,
        suffix,
        showCount = false,
        size = 'm',
        value,
        status,
        onChange,
        onPressEnter,
        onClear,
        ...restProps
    } = prop;

    const bem = createCssSCope('input');
    const className = bem([size, prop.type]);

    const [inputValue, setInputValue] = useMergeState<string>(value, defaultValue);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [inputIsFocus, setInputIsFocus] = React.useState<boolean>(false);

    const valueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (inputRef.current) {
            resolveOnChange(inputRef.current, e, onChange);
        }
    };

    if (value !== undefined && inputRef.current) {
        inputRef.current!.value = inputValue;
    }

    const keyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onPressEnter?.();
            return;
        }
        if (e.key === 'Backspace') {
            onClear?.();
        }
    };

    const cleanAll = (e: React.MouseEvent) => {
        setInputValue('');
        inputRef.current!.value = '';
        inputRef.current?.focus();
        if (inputRef.current) {
            resolveOnChange(inputRef.current, e, onChange);
        }
    };

    useEventListener(inputRef.current, 'keydown', keyPress);
    return (
        <span className={bem('panel', [size])}>
            {addonBefore && <span className={bem('addOn')}> {addonBefore} </span>}
            <span
                className={bem('box', {
                    focus: inputIsFocus,
                    error: status === 'error',
                    warning: status === 'warning'
                })}
            >
                {prefix && <span className={bem('prefix')}>{prefix}</span>}
                <input
                    maxLength={maxLength}
                    ref={inputRef}
                    className={className}
                    {...restProps}
                    value={inputValue}
                    onChange={valueChange}
                    onFocus={(e) => {
                        restProps.onFocus?.(e);
                        setInputIsFocus(true);
                    }}
                    onBlur={(e) => {
                        restProps.onBlur?.(e);
                        setInputIsFocus(false);
                    }}
                ></input>
                <span className={bem('suffix')}>
                    {allowClear && inputValue.length > 0 && (
                        <span className={bem('suffix__item')}>
                            <CleanFillIcon
                                onClick={(e) => {
                                    cleanAll(e);
                                }}
                            ></CleanFillIcon>
                        </span>
                    )}
                    {showCount && (
                        <span
                            className={bem('suffix__item', {
                                beyondLen: maxLength !== undefined && inputValue.length > maxLength
                            })}
                        >
                            {maxLength ? `${inputValue?.length} / ${maxLength}` : inputValue.length}
                        </span>
                    )}
                    {suffix && <span>{suffix}</span>}
                </span>
            </span>
            {addonAfter && <span className={bem('addOn')}>{addonAfter}</span>}
        </span>
    );
};

export { Input };
