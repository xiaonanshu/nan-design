import React, { useEffect } from 'react';

import { SwitchProps } from './interface';
import { createCssSCope } from '../../utils/bem';
import { useMergeState } from '../../utils/hooks/useMergeState';

const Switch: React.FC<SwitchProps> = (props) => {
    const {
        checked,
        defaultChecked = false,
        size = 's',
        disabled = false,
        checkedNode,
        unCheckedNode,
        checkedColor,
        unCheckedColor,
        onChange,
        onClick,
        ...restProps
    } = props;

    const [checkedState, setCheckedState] = useMergeState(checked, defaultChecked);

    const bem = createCssSCope('switch');
    const className = bem([size], {
        disabled,
        checked: checkedState
    });

    useEffect(() => {
        onChange?.(checkedState); //相当于 onChange && onChange(checkedState)
    }, [onChange, checkedState]);

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) {
            return;
        }
        setCheckedState(!checkedState);
        onClick?.(checkedState, e);
    };

    const styles = {
        backgroundColor: checkedState ? checkedColor : unCheckedColor
    };

    return (
        <button
            type="button"
            className={className}
            disabled={disabled}
            style={styles}
            onClick={clickHandler}
        >
            <span className={bem('inner')}>{checkedState ? checkedNode : unCheckedNode}</span>
            <span className={bem('dot')}></span>
        </button>
    );
};

export { Switch };
