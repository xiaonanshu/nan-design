import React, { ReactElement, ReactNode, useEffect } from 'react';
import { FormItemProps } from './interface';
import { FormContext } from './utils/context';
import { createCssSCope } from '../../utils/bem';
import { RuleItem } from 'async-validator';

const FormItem: React.FC<FormItemProps> = (props) => {
    const {
        name = '',
        initialValue = '',
        label,
        trigger = 'onChange',
        rules = [],
        validateTrigger = 'onBlur',
        valuePropName = 'value',
        children
    } = props;

    const context = React.useContext(FormContext);
    const { dispatch, setFieldValue, validateField, initialValues, fields } = context;

    const bem = createCssSCope('form-item');
    const className = bem();

    // 初始化field
    useEffect(() => {
        const value = initialValues[name] || initialValue;
        if (name) {
            dispatch({
                type: 'addField',
                name,
                value: {
                    name,
                    value,
                    isValid: true,
                    errors: [],
                    rules
                }
            });
        }
    }, []);

    // 更新value
    const updateValue = (e: any) => {
        const value = e.target.value;
        setFieldValue(name, value);
    };

    // 检验
    const validateValue = async () => {
        await validateField(name);
    };

    /**
     * 在trigger时更新value，在validateTrigger时进行检验
     * 需要保证FormItem下有且仅有一个子元素
     * 通过给子元素对应触发事件绑定函数
     */
    const childrenList = React.Children.toArray(children);
    if (childrenList.length === 0) {
        console.warn(
            ' `name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.'
        );
    } else if (childrenList.length > 1) {
        console.error('A `Form.Item` with a `name` prop must have a single child element');
    } else if (!React.isValidElement(childrenList[0])) {
        console.error('Child Element is not a valid React Element');
    }
    // 属性列表，记录value以及trigger对应的事件
    const controlProps: any = {};
    // 设置了name才能进行验证
    if (name) {
        controlProps[valuePropName] = fields[name]?.value;
        controlProps[trigger] = updateValue;
        if (rules) {
            controlProps[validateTrigger] = validateValue;
        }
    }
    // 将属性列表合并到children上
    const child = childrenList[0] as ReactElement;
    const finalChildren = React.cloneElement(child, {
        ...child.props,
        ...controlProps,
        status: fields[name]?.errors.length > 0 ? 'error' : ''
    });

    return (
        <>
            <div className={className}>
                <div className={bem('content')}>
                    {label && (
                        <div
                            className={bem('label', {
                                required: rules.some((item: RuleItem) => item['required'])
                            })}
                        >
                            {label}
                        </div>
                    )}
                    <div className={bem('box')}>
                        <div className={bem('inner', { error: fields[name]?.errors.length > 0 })}>
                            {finalChildren}
                        </div>
                    </div>
                </div>
                {fields[name]?.errors.length > 0 && (
                    <div className={bem('error')}>{fields[name]?.errors[0].message}</div>
                )}
            </div>
        </>
    );
};

export default FormItem;
