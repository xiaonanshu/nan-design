import React from 'react';
import BaseForm from './Form';
import FormItem from './FormItem';
import { FormProps, FormRef } from './interface';

type FormComponentType = typeof BaseForm & {
    Item: typeof FormItem;
};

const Form = BaseForm as FormComponentType;
Form.Item = FormItem;
export { Form };
