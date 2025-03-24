import { ValidateError, RuleItem } from 'async-validator';
import { ReactNode } from 'react';
import useFileds from './hooks/useFields';
export interface FormProps {
    name?: string; //表单名称，会作为表单字段 id 前缀使用
    layout?: 'horizontal' | 'vertical';
    initialValues?: Record<string, any>;
    children?: any;
    disabled?: boolean;
    size?: 's' | 'm';
    onFinish?: (values: Record<string, any>) => void; //提交表单且数据验证成功后回调事件
    onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void; //提交表单且数据验证失败后回调事件
    style: React.CSSProperties;
}

export interface FormItemProps {
    name?: string; //字段名
    label?: string; //label 标签的文本
    children?: ReactNode;
    initialValue?: string; //默认值
    valuePropName?: string; //子节点的值的属性名,比如input的value，checkbox的checked
    trigger?: string; //设置收集字段值变更的时机
    rules?: RuleItem[]; //校验规则，设置字段的校验逻辑
    validateTrigger?: string; //设置字段校验的时机
    style: React.CSSProperties;
}

// 表单状态
export interface FormStatus {
    isValid?: boolean; //是否合法
    errors?: Record<string, ValidateError[]>; // 错误信息
}

// Field
export interface Field {
    name?: string;
    value?: string;
    isValid?: boolean;
    errors?: ValidateError[];
    rules?: RuleItem[];
}

// fieldsDispatch的action类型
export interface FieldAction {
    type: 'addField' | 'updateFieldValue' | 'updateValidResult';
    name: string;
    value: any;
}
export type FormRef = Omit<ReturnType<typeof useFileds>, 'dispatch' | 'fields' | 'formStatus'>;
