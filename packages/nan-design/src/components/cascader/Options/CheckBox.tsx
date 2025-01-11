import React, { useEffect, useRef } from 'react';
import { createCssSCope } from '../../../utils/bem';
import { CheckBoxProp } from './interface';
import { Option } from '../interface';

const CheckBox: React.FC<CheckBoxProp<Option>> = (props) => {
    const { checked, onChange, disabledCheck = false } = props;
    const bem = createCssSCope('cascader-panel');
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = checked === 'indeterminate';
        }
    }, [checked]);
    return (
        <input
            type="checkbox"
            className={bem('options__item__check')}
            ref={ref}
            checked={checked === 'checked'}
            onChange={(e) => {
                if (disabledCheck) {
                    return;
                }
                onChange?.();
            }}
        ></input>
    );
};
export default CheckBox;
