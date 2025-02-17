import React from 'react';
import { FormProps, FormRef } from './interface';
import { createCssSCope } from '../../utils/bem';
import { FormContext } from './utils/context';
import useFileds from './hooks/useFields';
import './style/index.scss';

const Form = React.forwardRef<FormRef, FormProps>((props, ref) => {
    const {
        name = 'nan_form',
        size = 'm',
        initialValues = {},
        children,
        disabled = false,
        onFinish,
        onFinishFailed,
        ...restFormProps
    } = props;

    const bem = createCssSCope('form');
    const className = bem([size], { disabled });
    const { fields, dispatch, formStatus, ...restProps } = useFileds(initialValues);
    const { setFieldValue, validateField, validateAllFields } = restProps;
    React.useImperativeHandle(ref, () => {
        return {
            ...restProps
        };
    });
    // 提交的回调
    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // 验证整个表单
        const { isValid, errors, values } = await validateAllFields();
        if (isValid) {
            //成功
            onFinish?.(values);
        } else {
            //失败
            onFinishFailed?.(values, errors);
        }
    };

    const context = {
        dispatch,
        setFieldValue,
        validateField,
        initialValues,
        fields
    };

    return (
        <>
            <form className={className} name={name} onSubmit={submitForm} {...restFormProps}>
                <FormContext.Provider value={context}>{children}</FormContext.Provider>
            </form>
        </>
    );
});

Form.displayName = 'Form';

export default Form;
