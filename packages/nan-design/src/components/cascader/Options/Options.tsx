import React, { useContext } from 'react';
import { OptionsProp } from './interface';
import { Option } from '../interface';
import './style/index.scss';
import { createCssSCope } from '../../../utils/bem';
import { CascaderContext } from '../utils/context';
import { ArrowRightIcon } from '@nan-design/icons';
import classNames from 'classnames';
import CheckBox from './CheckBox';

const Options = <T extends Option>(props: OptionsProp<T>) => {
    const { selected, options, onClick, depth, multipleOptions = [], multipleClick } = props;
    const bem = createCssSCope('cascader-panel');
    const context = useContext(CascaderContext);

    const hoverHandle = (option: T, e: React.MouseEvent) => {
        if (
            (e.target as HTMLElement).nodeName === 'INPUT' &&
            (e.target as HTMLInputElement).type === 'checkbox'
        ) {
            return;
        }
        if (option.disabled || context?.expandTrigger !== 'hover') {
            return;
        }
        if (!option.children || option.children.length === 0) {
            return;
        }
        onClick?.(option, depth);
    };

    const clickHandle = (option: T, e: React.MouseEvent) => {
        if (
            (e.target as HTMLElement).nodeName === 'INPUT' &&
            (e.target as HTMLInputElement).type === 'checkbox'
        ) {
            return;
        }
        if (option.disabled) {
            return;
        }
        onClick?.(option, depth);
        if (!option.children || option.children.length === 0) {
            if (!context) {
                return;
            }
        }
    };

    const isSelected = (option: T) => {
        if (selected === undefined) {
            return;
        }
        if (selected.length >= depth && option.value === selected[depth - 1].value) {
            return true;
        }
        return false;
    };

    return (
        <div>
            <ul className={bem('options', { disabled: context?.disabled })}>
                {options?.map((option, index) => {
                    return (
                        <li
                            key={`${depth}-${index}-${option.value}`}
                            className={classNames(
                                bem('options__item', {
                                    disabled: option.disabled,
                                    selected: isSelected(option)
                                })
                            )}
                            onClick={(e) => {
                                clickHandle(option, e);
                            }}
                            onMouseEnter={(e) => {
                                hoverHandle(option, e);
                            }}
                        >
                            {multipleOptions.length > 0 && (
                                <CheckBox
                                    checked={multipleOptions[index].checked}
                                    onChange={() => {
                                        multipleClick?.(option, multipleOptions[index].checked);
                                    }}
                                    disabledCheck={multipleOptions[index].disabledCheck}
                                ></CheckBox>
                            )}
                            <span>{option.label}</span>
                            {option.children && option.children.length > 0 && (
                                <span className={bem('options__item__icon')}>
                                    <ArrowRightIcon></ArrowRightIcon>
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
export default Options;
