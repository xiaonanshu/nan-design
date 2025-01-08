import React, { useContext } from 'react';
import { OptionsProp } from './interface';
import { Option } from '../interface';
import './style/index.scss';
import { createCssSCope } from '../../../utils/bem';
import { CascaderContext } from '../utils/context';
import classNames from 'classnames';

const Options = <T extends Option>(props: OptionsProp<T>) => {
    const { selected, options, onClick, depth } = props;
    const bem = createCssSCope('cascader-panel');
    const context = useContext(CascaderContext);

    const hoverHandle = (option: T) => {
        if (option.disabled || context?.expandTrigger !== 'hover') {
            return;
        }
        if (!option.children || option.children.length === 0) {
            return;
        }
        onClick?.(option, depth);
    };

    const clickHandle = (option: T) => {
        if (option.disabled) {
            return;
        }
        if (context?.changeOnSelect) {
            context.setSelectedText(selected!.map((item) => item.label).join(' / '));
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
                            className={classNames(
                                bem('options__item', {
                                    disabled: option.disabled,
                                    selected: isSelected(option)
                                })
                            )}
                            key={`${depth}-${index}-${option.value}`}
                            onClick={() => {
                                clickHandle(option);
                            }}
                            onMouseEnter={() => {
                                hoverHandle(option);
                            }}
                        >
                            {option.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
export default Options;
