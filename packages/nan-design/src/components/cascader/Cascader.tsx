import React from 'react';
import { createCssSCope } from '../../utils/bem';
import { ArrowDownIcon, CleanFillIcon } from '../../../../nan-design-icon/src';
import { CascaderProp, Option, CascaderContextType } from './interface';
import Options from './Options/Options';
import { CascaderContext } from './utils/context';
import { useGetSelected } from './hooks/useGetSelected';
import { useEventListener } from '../../utils/hooks/useEventListener';
import getShowingOptions from './utils/getShowingOptions';

const Cascader = <T extends Option>(props: CascaderProp<T>) => {
    type Value = T['value'];
    const {
        size = 'm',
        allowClear = false,
        changeOnSelect = false,
        className = '',
        defaultValue = [],
        disabled = false,
        expandTrigger = 'click',
        multiple = false,
        options = [],
        placeholder = '请选择',
        onChange
    } = props;

    const innerRef = React.useRef<HTMLDivElement>(null);
    const optionsRef = React.useRef<HTMLDivElement>(null);
    const cleanRef = React.useRef<HTMLSpanElement>(null);
    const dropRef = React.useRef<HTMLSpanElement>(null);
    const [selected, setSelected] = useGetSelected(options, defaultValue);
    const [allOption, setAllOption] = React.useState<T[]>(options);
    // 显示选择内容
    const [selectedText, setSelectedText] = React.useState<string>(
        selected.current.map((item) => item.label).join(' / ') || placeholder
    );
    // 显示的选择列表
    const defaultShowingOptions: T[][] = getShowingOptions(options, selected.current);
    const [showingOptions, setShowingOptions] = React.useState<T[][]>(defaultShowingOptions || []);
    // 控制是否显示整个选择列表
    const [showOptions, setShowOptions] = React.useState<boolean>(false);
    // 是否有选中选项
    const [hasSelected, setHasSelected] = React.useState<boolean>(
        defaultValue.length > 0 ? true : false
    );
    const contextValue: CascaderContextType<T> = {
        options,
        disabled,
        allowClear,
        expandTrigger,
        changeOnSelect,
        setSelectedText
    };
    const bem = createCssSCope('cascader');
    const customClassName = bem([size], {
        disabled,
        multiple
    });

    // 选择完成时
    const changeHandle = (value: Value[], selectedOptions: T[]) => {
        onChange?.(value, selectedOptions);
        setSelectedText(selectedOptions.map((item) => item.label).join(' / '));
        setHasSelected(true);
        setShowOptions(false);
    };

    const addShowingOption = (option: T, depth: number) => {
        // 展示的最深层子选项，在它外层的要展示，在它里层的不展示，如果没有下一层就表示选中了某个值，这时要使它只有第一层的展示数据
        setSelected(option, depth);
        const newShowingOptions: T[][] = showingOptions.slice(0, depth);
        if (option.children && option.children.length > 0) {
            newShowingOptions.push(option.children as T[]);
        } else {
            changeHandle(
                selected.current.map((item) => item.value),
                selected.current
            );
        }
        setShowingOptions(newShowingOptions);
    };

    const innerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) {
            return;
        }
        if (
            !cleanRef.current ||
            (cleanRef.current && !cleanRef.current.contains(e.target as Node))
        ) {
            setShowOptions(!showOptions);
        }
    };

    const closeOptions = (e: MouseEvent) => {
        if (
            innerRef.current &&
            !innerRef.current.contains(e.target as Node) &&
            optionsRef.current &&
            !optionsRef.current.contains(e.target as Node)
        ) {
            setShowOptions(false);
        }
    };
    useEventListener(window, 'click', closeOptions);

    if (cleanRef.current) {
        cleanRef.current.onclick = () => {
            if (disabled) {
                return;
            }
            setHasSelected(false);
            setSelectedText('请选择');
            setShowOptions(false);
            setSelected(options[0], 0);
            setShowingOptions(showingOptions.slice(0, 1));
        };
    }
    // 监听是否有选中，没有时，鼠标移入一直显示drop图标
    React.useEffect(() => {
        if (!allowClear) {
            dropRef.current!.style.opacity = '1';
            return;
        }
        if (!hasSelected || disabled) {
            cleanRef.current!.style.opacity = '0';
            dropRef.current!.style.opacity = '1';
        } else {
            cleanRef.current?.style.removeProperty('opacity');
            dropRef.current?.style.removeProperty('opacity');
        }
    }, [hasSelected]);

    return (
        <CascaderContext.Provider value={contextValue}>
            <div className={`${className} ${customClassName}`}>
                <div
                    ref={innerRef}
                    className={bem('inner')}
                    onClick={(e) => {
                        innerClick(e);
                    }}
                    style={{ borderColor: showOptions ? '#436ff8' : '' }}
                >
                    <span
                        className={
                            hasSelected && !showOptions
                                ? bem('inner__text')
                                : bem('inner__placeholder')
                        }
                    >
                        {selectedText}
                    </span>
                    <span className={bem('icon')}>
                        {allowClear && (
                            <CleanFillIcon
                                className={bem('icon', ['clean'])}
                                ref={cleanRef}
                            ></CleanFillIcon>
                        )}
                        <ArrowDownIcon
                            className={bem('icon', ['drop'])}
                            ref={dropRef}
                        ></ArrowDownIcon>
                    </span>
                </div>
                <div className={bem('options-panel')} ref={optionsRef}>
                    {showOptions &&
                        showingOptions.map((options, index) => {
                            return (
                                <Options
                                    options={options}
                                    key={index}
                                    onClick={addShowingOption}
                                    depth={index + 1}
                                    selected={selected.current}
                                ></Options>
                            );
                        })}
                </div>
            </div>
        </CascaderContext.Provider>
    );
};

export { Cascader };
