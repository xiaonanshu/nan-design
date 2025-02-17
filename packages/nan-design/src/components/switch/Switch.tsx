import React, { useEffect } from 'react';

import { SwitchProps } from './interface';
import { createCssSCope } from '../../utils/bem';
import { useMergeState } from '../../utils/hooks/useMergeState';
import './style/index.scss';

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
        loading = false,
        ...restProps
    } = props;

    const loadingIcon = (
        <span className="nan-switch-loading-icon">
            <svg viewBox="0 0 1024 1024" fill="currentColor" width="1em" height="1em">
                <path d="M512 170.666667C323.477333 170.666667 170.666667 323.477333 170.666667 512s152.810667 341.333333 341.333333 341.333333 341.333333-152.810667 341.333333-341.333333h85.333334c0 235.648-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333v85.333334z"></path>
            </svg>
        </span>
    );

    const [checkedState, setCheckedState] = useMergeState(checked, defaultChecked);

    const bem = createCssSCope('switch');
    const className = bem([size], {
        disabled,
        loading,
        checked: checkedState
    });

    useEffect(() => {
        onChange?.(checkedState); //相当于 onChange && onChange(checkedState)
    }, [onChange, checkedState]);

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) {
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
            <span className={bem('dot')}>{loading && loadingIcon}</span>
        </button>
    );
};

export { Switch };
