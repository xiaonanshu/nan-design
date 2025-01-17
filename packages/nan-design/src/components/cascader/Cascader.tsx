import React from 'react';
import { createCssSCope } from '../../utils/bem';
import { ArrowDownIcon, CleanFillIcon } from '@nan-design/icons';
import { CascaderProp, Option, CascaderContextType, MultipleSelectedOption } from './interface';
import Options from './Options/Options';
import { CascaderContext } from './utils/context';
import { useGetSelected } from './hooks/useGetSelected';
import { useEventListener } from '../../utils/hooks/useEventListener';
import getShowingOptions from './utils/getShowingOptions';
import MultipleItem from './multipleSelectedItem';
import { isArray } from '../../utils/helper';

const Cascader = <T extends Option>(props: CascaderProp<T>) => {
    type Value = T['value'];
    const {
        size = 'm',
        allowClear = true,
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
    let defaultShowingOptions: T[][] = getShowingOptions(options, selected.current);
    const [showingOptions, setShowingOptions] = React.useState<T[][]>(defaultShowingOptions || []);
    // 控制是否显示整个选择列表
    const [showOptions, setShowOptions] = React.useState<boolean>(false);
    // 是否有选中选项
    const [hasSelected, setHasSelected] = React.useState<boolean>(
        defaultValue.length > 0 ? true : false
    );

    // 对象，类型为OptionTree ，每个OptionNode在原先的基础上添加了它的直接父级选项作为属性，方便向上查找
    const tree = React.useRef<OptionTree>({});

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

    /**
     * 初始化 获得选中选项
     * @param defaultValue
     * @returns
     */
    const init = (defaultValue: Value[] | Value[][]) => {
        if (defaultValue.length === 0) {
            return;
        }
        if (!multiple) {
            defaultShowingOptions = getShowingOptions(options, selected.current);
        } else {
            defaultShowingOptions = [options];
            if (curOptions.length > 0) {
                return;
            }
            defaultValue.forEach((value: Value[] | Value) => {
                if (!isArray(value)) {
                    return;
                }
                const node = tree.current[value[value.length - 1]];
                if (!node) {
                    return;
                }
                checked(node);
            });
        }
        // 点击清除所有选项
        if (cleanRef.current) {
            cleanRef.current.onclick = () => {
                if (disabled) {
                    return;
                }
                if (multiple) {
                    setCurOptions([]);
                }
                setHasSelected(false);
                setSelectedText('请选择');
                setShowOptions(false);
                setSelected(options[0], 0);
                setShowingOptions(showingOptions.slice(0, 1));
            };
        }
    };
    React.useEffect(() => {
        if (multiple) {
            tree.current = getTree(options);
        }
        init(defaultValue);
    }, [defaultValue]);

    // 选择完成时，仅针对单选
    const changeHandle = (value: Value[], selectedOptions: T[]) => {
        if (multiple) {
            return;
        }
        onChange?.(value, selectedOptions);
        setSelectedText(selectedOptions.map((item) => item.label).join(' / '));
        setHasSelected(true);
        if (!multiple) {
            setShowOptions(false);
            return;
        }
    };

    /**
     * 设置展示的选项，
     * @param option
     * @param depth 层级 options最顶层option为1级，它们的直接子选项为2级，以此类推
     */
    const addShowingOption = (option: T, depth: number) => {
        // 展示的最深层子选项，在它外层的要展示，在它里层的不展示，如果没有下一层就表示选中了某个值，这时要使它只有第一层的展示数据
        if (!multiple) {
            setSelected(option, depth);
            if (changeOnSelect) {
                setSelectedText(selected.current.map((item) => item.label).join(' / '));
            }
        }
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

    /**
     * inner框专属的显示与隐藏选项框逻辑
     * @param e
     * @returns
     */
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

    /**
     * 关闭选项框
     * 给全局挂载，点击任意地方都可以关闭，但需要排除掉inner框，因为点击inner框和选项框时有专属的显示与展示逻辑
     * @param e
     */
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
    }, [hasSelected, allowClear]);

    // 多选逻辑
    type OptionNode = T & {
        parent: OptionNode | null;
    };
    type OptionTree = { [key: string]: OptionNode | null };
    const [curOptions, setCurOptions] = React.useState<OptionNode[]>([]);
    /**
     * multiple下 针对每一级获取选中的元素，options是当前展示的一层级元素。比如，第一级选项、点击第一级中的某个选项后会打开它的直接子选项，这就是第二级，以此类推
     * @param options
     * @returns
     */
    const getMultipleSelected = (options: T[]): MultipleSelectedOption<T>[] => {
        if (!multiple) {
            return [];
        }
        // 给每一层显示的选项设置选择状态
        // 状态：checked: 选中（子元素全选）unCheck：未选中（子元素全没选）indeterminate：中间态（子元素部分选中）
        const optionsWithState = options.map((option) => {
            return { ...option, checked: 'unCheck' };
        }) as MultipleSelectedOption<T>[];
        const curOptionsValues = new Set(curOptions.map((item) => item.value));

        /**
         * 针对一个选项
         * 如果它本身就在curOptions中或者它的父代节点在curOptions中，那么它的子选项肯定全选中，即他的状态为checked
         * 如果它的某个子代节点在curOptions中，那么它的状态为indeterminate
         */
        // 它本身就在curOptions中或者它的父代节点在curOptions中
        optionsWithState.forEach((item) => {
            let node = tree.current[item.value];
            while (node) {
                if (curOptionsValues.has(node?.value)) {
                    item.checked = 'checked';
                    break;
                }
                node = node.parent;
            }
        });

        // 它的某个子代节点在curOptions中，(它是curOptions中某个节点的父代节点)
        curOptions.forEach((item) => {
            let node = item;
            while (node) {
                const index = optionsWithState.findIndex((item) => item.value === node.value);
                if (index !== -1 && optionsWithState[index].checked === 'unCheck') {
                    optionsWithState[index].checked = 'indeterminate';
                    break;
                }
                node = node.parent as OptionNode;
            }
        });

        return optionsWithState;
    };

    /**
     * 构建父子关系，原先已经存在children，可以向下查找，但是不能向上查找，构建后添加了直接父级作为parent，可以向上查找
     * @param options
     * @returns
     */
    const getTree = (options: T[]) => {
        const res: OptionTree = {};
        const dfs = (nodes: T[], parent: OptionNode | null = null) => {
            for (let i = 0; i < nodes.length; i++) {
                const children: T[] = (nodes[i].children as T[]) || [];
                const newNode: OptionNode = { ...nodes[i], parent };
                res[newNode.value] = newNode;
                dfs(children, newNode);
            }
        };
        dfs(options);
        return res;
    };

    // 选择一个节点
    const checked = (option: T | OptionNode) => {
        // 首先将curOPtions中原有的option子节点去掉
        // 其子节点全选，向下影响
        const node = tree.current[option.value] as OptionNode;
        const newCurOptions: OptionNode[] = curOptions.slice();
        newCurOptions.push(node);
        let last = node.parent;

        while (true) {
            if (
                last &&
                last.children?.length ===
                    newCurOptions.filter(
                        (option) => option.parent && option.parent.value === last?.value
                    ).length
            ) {
                newCurOptions.push(last);
                last = last.parent;
            } else {
                break;
            }
        }

        setCurOptions(newCurOptions);
        removeChildren(node);
        if (!last) {
            removeChildren(newCurOptions[newCurOptions.length - 1]);
        } else if (last.value !== node.parent?.value) {
            removeChildren(last);
        }
    };

    // 删除一个节点的所有子节点
    const removeChildren = (option: OptionNode | null) => {
        if (!option) {
            return null;
        }
        setCurOptions((cur) => {
            return cur.filter((item) => {
                let isChild = false;
                let last = item.parent;
                while (last) {
                    if (last.value === option.value) {
                        isChild = true;
                        break;
                    }
                    last = last.parent;
                }
                return !isChild;
            });
        });
    };

    // 取消选择一个节点
    const unCheck = (option: T | OptionNode) => {
        const node = tree.current[option.value] as OptionNode;
        removeChildren(node);
        if (curOptions.some((item) => item.value === option.value)) {
            // cur里面有这个，表示其父节点的子节点未全选中，
            setCurOptions(curOptions.filter((item) => item.value !== option.value));
        } else {
            // cur里面没有这个而又是选中状态，表示其父节点的子节点全选中，这时需要将其兄弟节点全部放入cur并将其父节点从cur中移除
            const last = node.parent;
            if (!last) {
                return;
            }
            unCheck(last);
            setCurOptions((cur) => {
                return cur.concat(
                    last.children
                        ?.filter((item: Option) => item.value !== option.value)
                        ?.map((item: Option) => tree.current[item.value]) as OptionNode[]
                );
            });
            setCurOptions((cur) => {
                return cur.filter((item) => item.value !== last.value);
            });
        }
    };

    const click = (option: T, checkStatus: 'checked' | 'unCheck' | 'indeterminate') => {
        if (checkStatus === 'checked') {
            unCheck(option);
        } else {
            checked(option);
        }
    };

    // 只在multiple下会触发，因为非multiple下不会改变curOptions curOptions变化时触发onChange，找到里面每个option向上的父级，一直到最顶层，组成一个数组
    React.useEffect(() => {
        if (curOptions.length > 0) {
            setHasSelected(true);
        } else {
            setHasSelected(false);
        }
        // 变化
        const values: Value[][] = [];
        const options: T[][] = [];
        curOptions.forEach((item, index) => {
            const value: Value[] = [];
            const option = [];
            let last = item as OptionNode | null;
            while (last) {
                value.push(last.value);
                const { parent, ...orignOption } = last;
                option.push(orignOption as unknown as T);
                last = last.parent;
            }
            values.push(value.reverse());
            options.push(option.reverse() as T[]);
        });
        onChange?.(values, options);
    }, [curOptions]);

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
                    {multiple ? (
                        curOptions.length > 0 ? (
                            curOptions.map((item) => {
                                return (
                                    <MultipleItem
                                        key={`${item.value}-${item.label}`}
                                        selectedOption={item}
                                        deleteSelected={unCheck}
                                    ></MultipleItem>
                                );
                            })
                        ) : (
                            <span className={bem('inner__placeholder')}>{placeholder}</span>
                        )
                    ) : (
                        <span
                            className={
                                hasSelected && !showOptions
                                    ? bem('inner__text')
                                    : bem('inner__placeholder')
                            }
                        >
                            {selectedText}
                        </span>
                    )}
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
                        options &&
                        options.length > 0 &&
                        showingOptions.map((options, index) => {
                            return (
                                <Options
                                    options={options}
                                    key={index}
                                    onClick={addShowingOption}
                                    depth={index + 1}
                                    selected={selected.current}
                                    multipleOptions={getMultipleSelected(options)}
                                    multipleClick={click}
                                ></Options>
                            );
                        })}
                </div>
            </div>
        </CascaderContext.Provider>
    );
};

export { Cascader };
