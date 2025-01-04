import React, { useEffect, useState } from 'react';
import PaginationProps from './interface';
import { createCssSCope } from '../../utils/bem';
import { useMergeState } from '../../utils/hooks/useMergeState';
import PageJumper from './PageJumper/PageJumper';
import PageSizeSlector from './PageSizeSelector/PageSizeSelector';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowDoubleLeftIcon,
    ArrowDoubleRightIcon
} from '../../../../nan-design-icon/src';
import classNames from 'classnames';

const Pagination: React.FC<PaginationProps> = (props) => {
    const {
        size = 'm',
        total,
        current,
        defaultCurrent = 1,
        pageSize,
        defaultPageSize = 10,
        pageSizeOptions = [10, 20, 50, 100],
        showquickJumper = true,
        disabled = false,
        hideOnSinglePage = false,
        showTotal = true,
        onChange,
        pageSizeChange,
        ...restProps
    } = props;

    // 当前页码
    const [currentPage, setCurrentPage] = useMergeState(current, defaultCurrent);
    // 每页数据量
    const [currentPageSize, setCurrentPageSize] = useMergeState(pageSize, defaultPageSize);
    // 总页数
    const [totalPage, setTotalPage] = useState<number>(Math.ceil(total / currentPageSize));
    // 左右箭头是否可点击
    const [leftArrClick, setLeftArrClick] = useState<boolean>(true);
    const [rightArrClick, setRightArrClick] = useState<boolean>(true);
    // 每页配置
    let pageOptions = new Array(totalPage).fill(0).map((item, index) => {
        return {
            key: index,
            value: index + 1
        };
    });

    // 数据总量改变时触发
    useEffect(() => {
        const newTotalPage = Math.ceil(total / currentPageSize);
        if (newTotalPage !== totalPage) {
            setTotalPage(newTotalPage);
        }
        // 数据总量变化时，如果在最后一页，需要重新获取一次数据，因为在最后一页数据未满的情况下，数据总量变化会导致最后一页数据增加
        if (currentPage === totalPage) {
            onChange?.(currentPage, currentPageSize);
        }
    }, [total]);

    // 页码改变时触发
    useEffect(() => {
        onChange?.(currentPage, currentPageSize);
        setLeftArrClick(true);
        setRightArrClick(true);
        if (currentPage === 1) {
            setLeftArrClick(false);
        }
        if (currentPage === totalPage) {
            setRightArrClick(false);
        }
    }, [currentPage]);

    // 每页数据量改变时触发
    useEffect(() => {
        const newTotalPage = Math.ceil(total / currentPageSize);
        setTotalPage(newTotalPage);
        if (newTotalPage < currentPage) {
            setCurrentPage(newTotalPage);
        } else {
            onChange?.(currentPage, currentPageSize);
        }

        pageOptions = new Array(newTotalPage).fill(0).map((item, index) => {
            return {
                key: index,
                value: index + 1
            };
        });
    }, [currentPageSize]);

    // 生成类名
    const bem = createCssSCope('pagination');
    const className = bem([size], {
        disabled
    });

    // 修改当前页码
    const changeCurrentPage = (page: number) => {
        if (page >= 1 && page <= totalPage) {
            setCurrentPage(page);
        } else {
            if (page < 1) {
                setCurrentPage(1);
            }
            if (page > totalPage) {
                setCurrentPage(totalPage);
            }
        }
    };

    // 跳转页码
    const jumpHandler = (page: number) => {
        let target = page;
        if (target > totalPage) {
            target = totalPage;
        } else if (target < 1) {
            target = 1;
        }

        setCurrentPage(target);
    };

    return (
        <div className={className}>
            <span
                className={classNames(bem('item'), bem('prev', { disabled: !leftArrClick }))}
                onClick={() => {
                    changeCurrentPage(currentPage - 1);
                }}
            >
                <ArrowLeftIcon></ArrowLeftIcon>
            </span>
            <span
                className={bem('item', { selected: currentPage === 1 })}
                onClick={() => {
                    changeCurrentPage(1);
                }}
            >
                1
            </span>
            {pageOptions.length > 1 &&
                pageOptions.map((item) => {
                    if (item.value === 1 || item.value === totalPage) {
                        return;
                    }

                    // 可选页码的左边界和右边界 最多连续可选页码数为5
                    let showPageLeft = currentPage - 2;
                    let showPageRight = currentPage + 2;
                    if (showPageLeft < 1) {
                        showPageRight = showPageRight - showPageLeft + 1;
                    }
                    if (showPageRight > totalPage) {
                        showPageLeft = showPageLeft - (showPageRight - totalPage);
                    }
                    // 当折叠的页码数不超过2时，折叠无意义，为什么是小于等于2：因为第一页和最后一页始终显示
                    if (totalPage - 5 <= 2) {
                        showPageLeft = 1;
                        showPageRight = totalPage;
                    }

                    if (item.value >= showPageLeft && item.value <= showPageRight) {
                        return (
                            <span
                                className={bem('item', { selected: currentPage === item.value })}
                                key={item.key}
                                onClick={() => {
                                    changeCurrentPage(item.value);
                                }}
                            >
                                {item.value}
                            </span>
                        );
                    }
                    if (
                        (showPageLeft - 1 > 1 && item.value === 2) ||
                        (totalPage - showPageRight > 1 && item.value === totalPage - 1)
                    ) {
                        return (
                            <span
                                key={item.key}
                                className={bem('item', ['container'])}
                                onClick={() => {
                                    if (item.value === 2) {
                                        changeCurrentPage(currentPage - 5);
                                    } else {
                                        changeCurrentPage(currentPage + 5);
                                    }
                                }}
                            >
                                <span className={bem('icon', ['arrow-double'])}>
                                    {item.value === 2 ? (
                                        <ArrowDoubleLeftIcon></ArrowDoubleLeftIcon>
                                    ) : (
                                        <ArrowDoubleRightIcon></ArrowDoubleRightIcon>
                                    )}
                                </span>
                                <span
                                    className={bem('icon', ['ellipsis'])}
                                    onClick={() => {
                                        if (item.value === 2) {
                                            changeCurrentPage(currentPage - 5);
                                        } else {
                                            changeCurrentPage(currentPage + 5);
                                        }
                                    }}
                                >
                                    •••
                                </span>
                            </span>
                        );
                    }
                })}
            {totalPage !== 1 && (
                <span
                    className={classNames(bem('item', { selected: currentPage === totalPage }))}
                    onClick={() => {
                        changeCurrentPage(totalPage);
                    }}
                >
                    {totalPage}
                </span>
            )}
            <span
                className={classNames(bem('item'), bem('next', { disabled: !rightArrClick }))}
                onClick={() => {
                    changeCurrentPage(currentPage + 1);
                }}
            >
                <ArrowRightIcon></ArrowRightIcon>
            </span>
            <PageSizeSlector
                size={size}
                pageSizeChange={(pageSize) => setCurrentPageSize(pageSize)}
                currentPageSize={currentPageSize}
            ></PageSizeSlector>
            <PageJumper show={showquickJumper} jumpCallback={jumpHandler} size={size}></PageJumper>
        </div>
    );
};

export { Pagination };
