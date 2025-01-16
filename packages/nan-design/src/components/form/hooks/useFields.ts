import React from 'react';
import { FormProps, Field, FieldAction, FormStatus } from '../interface';
import Schema, { RuleItem, ValidateError } from 'async-validator';

const useFileds = (initialValues: FormProps['initialValues']) => {
    // 构建Fields，每个Field对应每个FormItem的信息，应该包含：name、value、errors、isValid、rules
    // 使用useReducer管理fields，fields是一个对象，涉及到对其的多种不同操作，使用reducer集中处理逻辑
    const fieldsDispatch = (state: { [key: string]: Field }, action: FieldAction) => {
        switch (action.type) {
            // 添加field
            case 'addField':
                return {
                    ...state,
                    [action.name]: { ...action.value }
                };
            // 修改某个字段的值
            case 'updateFieldValue':
                return {
                    ...state,
                    [action.name]: { ...state[action.name], value: action.value }
                };
            // 修改验证结果
            case 'updateValidResult': {
                const { isValid, errors } = action.value;
                return {
                    ...state,
                    [action.name]: { ...state[action.name], isValid, errors }
                };
            }
        }
    };
    const [fields, dispatch] = React.useReducer(fieldsDispatch, {});
    // 整个表单的验证状态
    const [formStatus, setFormStatus] = React.useState<FormStatus>({});
    const setFieldValue = (name: string, value: string) => {
        if (fields[name]) {
            dispatch({ type: 'updateFieldValue', name, value });
        }
    };
    //重置表单
    const resetFields = () => {
        for (const name of Object.keys(fields)) {
            if (initialValues && initialValues[name]) {
                dispatch({ type: 'updateFieldValue', name, value: initialValues[name] });
            } else {
                dispatch({ type: 'updateFieldValue', name, value: '' });
            }
        }
    };
    // 获取field某个name的值
    const getFieldValue = (name: string) => {
        return fields[name] && fields[name].value;
    };
    // 获取field所有Value
    type FieldValue = { [key: string]: string };
    const getFieldsValue = () => {
        const keys = Object.keys(fields);
        return keys.reduce((pre, cur) => {
            pre[cur] = fields[cur].value;
            return pre;
        }, {} as FieldValue);
    };
    // 获取field所有rules
    type FieldRule = { [key: string]: RuleItem[] };
    const getFieldsRules = () => {
        const keys = Object.keys(fields);
        return keys.reduce((pre, cur) => {
            pre[cur] = fields[cur].rules;
            return pre;
        }, {} as FieldRule);
    };

    // 单项验证
    const validateField = async (name: string) => {
        const { value, rules } = fields[name];
        const descriptor = {
            [name]: rules
        };
        const valueMap = {
            [name]: value
        };
        const validator = new Schema(descriptor);
        let isValid = true;
        let errors: ValidateError[] = [];
        await validator
            .validate(valueMap)
            .then(() => {})
            .catch(({ errors: e, fields }) => {
                isValid = false;
                errors = e;
            })
            .finally(() => {
                dispatch({ type: 'updateValidResult', name, value: { isValid, errors } });
            });
    };

    // 表单验证
    const validateAllFields = async () => {
        const descriptor = getFieldsRules();
        const valueMap = getFieldsValue();
        let isValid: boolean = true;
        let errors: Record<string, ValidateError[]> = {};
        const validator = new Schema(descriptor);
        await validator
            .validate(valueMap)
            .then(() => {})
            .catch(({ error: e, fields }) => {
                isValid = false;
                errors = fields;
                // 根据总的错误信息更新每个字段的错误信息
                for (const k of Object.keys(fields)) {
                    if (errors[k]) {
                        dispatch({
                            type: 'updateValidResult',
                            name: k,
                            value: { isValid: false, errors: errors[k] }
                        });
                    } else {
                        dispatch({
                            type: 'updateValidResult',
                            name: k,
                            value: { isValid: true, errors: [] }
                        });
                    }
                }
            })
            .finally(() => {
                setFormStatus({ ...formStatus, isValid, errors });
            });
        return {
            isValid,
            errors,
            values: valueMap
        };
    };
    return {
        fields,
        dispatch,
        formStatus,
        getFieldValue,
        setFieldValue,
        getFieldsRules,
        getFieldsValue,
        resetFields,
        validateField,
        validateAllFields
    };
};

export default useFileds;
