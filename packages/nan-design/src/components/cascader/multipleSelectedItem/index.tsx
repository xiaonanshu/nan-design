import React from 'react';
import MultipleItemProps from './interface';
import './style/index.scss';
import { Option } from '../interface';
import { createCssSCope } from '../../../utils/bem';
import { DeleteIcon } from '../../../../../nan-design-icon/src';

const MultipleItem = <T extends Option & { disableCheckbox?: boolean }>(
    props: MultipleItemProps<T>
) => {
    const { selectedOption, deleteSelected } = props;
    const deleteRef = React.useRef<HTMLSpanElement>(null);
    const bem = createCssSCope('cascader-multiple');
    const className = bem('item', { disabled: selectedOption?.disableCheckbox });
    const deleteHandle = (option: T) => {
        deleteSelected?.(option);
    };
    return (
        <span className={className}>
            <span className={bem('item__text')}>{selectedOption?.label}</span>
            <span className={bem('item__icon', ['delete'])}>
                <DeleteIcon
                    onClick={() => {
                        deleteHandle(selectedOption!);
                    }}
                ></DeleteIcon>
            </span>
        </span>
    );
};

export default MultipleItem;
