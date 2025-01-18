import React, { useEffect, useRef, useState } from 'react';
import PageSizeSlectorProps from './interface';
import './style/index.scss';
import { createCssSCope } from '../../../utils/bem';
import { ArrowDownIcon, ArrowUpIcon } from '@nan-design/icons';
import { useEventListener } from '../../../utils/hooks/useEventListener';

const PageSizeSlector: React.FC<PageSizeSlectorProps> = (props) => {
    const {
        pageSizeChange,
        pageSizeOptions = [10, 20, 50, 100],
        currentPageSize,
        size,
        disabled
    } = props;

    const [sizeOptions, setSizeOptions] = useState<number[]>(pageSizeOptions);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const innerRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const bem = createCssSCope('pagination-pageSizeSelector');
    const className = bem([size], { disabled });

    useEffect(() => {
        if (!sizeOptions.includes(currentPageSize)) {
            sizeOptions.push(currentPageSize);
            setSizeOptions(sizeOptions.sort((a, b) => a - b));
        }
    }, [pageSizeOptions]);

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
    // useCapture设置为true时，点击地方为右侧箭头才能正确打开列表
    useEventListener(window, 'click', closeOptions, true);

    const selectHandle = (pageSize: number) => {
        pageSizeChange?.(pageSize);
        setShowOptions(false);
    };

    const style: React.CSSProperties = {};
    if (showOptions) {
        style.color = 'rgba(128, 128, 128, 0.5)';
    }

    return (
        <div className={className}>
            <div
                className={bem('inner')}
                onClick={() => {
                    if (disabled) {
                        return;
                    }
                    setShowOptions(!showOptions);
                }}
                ref={innerRef}
            >
                <span style={style}> {currentPageSize} 条 / 页 </span>
                <span className={bem('arrowIcon')}>
                    {showOptions ? <ArrowUpIcon></ArrowUpIcon> : <ArrowDownIcon></ArrowDownIcon>}
                </span>
            </div>
            {showOptions && (
                <div className={bem('options')} ref={optionsRef}>
                    {sizeOptions.map((option, index) => {
                        return (
                            <div
                                key={option}
                                className={bem('options-item', {
                                    selected: option === currentPageSize
                                })}
                                onClick={() => {
                                    selectHandle(option);
                                }}
                            >
                                {option} 条 / 页
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PageSizeSlector;
