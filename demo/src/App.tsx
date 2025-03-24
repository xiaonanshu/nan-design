import './App.css';
import React from 'react';
import { Input, Form } from 'antd';
import { Input as I, Form as F, Button, Cascader } from '@nan-design/react/src/index';
import { useState } from 'react';
import { DeleteIcon } from '@nan-design/icons/src/index';
import { FormRef } from '../../packages/nan-design/src/components/form/interface';
import CascaderCom from './components/Cascader';
import List from './components/List';
import List2 from './components/List/list2';

function App() {
    const [value, setValue] = useState('100');
    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        setValue(e.target.value);
        console.log(e.target.value);
        console.log(value);
    };
    const onFinish = (values: any) => {
        console.log('登录', values);
    };
    const onFinishFailed = (values: any, errors: any) => {
        console.log('失败', values, errors);
    };
    const form = React.useRef<FormRef>(null);
    if (form.current) {
        console.log(form.current);
    }
    return (
        // <div style={{ width: '500px' }}>
        //     <Input.Password showCount allowClear maxLength={16}></Input.Password>
        //     <I.Password showCount allowClear maxLength={16} onChange={onchange}></I.Password>
        //     <I addonBefore={<span>1</span>}></I>
        //     <I></I>
        //     <Input addonAfter={<span>1</span>} addonBefore={<span>1</span>}></Input>

        //     <Form ref={form}>
        //         <Form.Item label="密码" name="password" rules={[{ required: true }]}>
        //             {/* <Input></Input> */}
        //             <Input></Input>
        //         </Form.Item>
        //         <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
        //             {/* <Input></Input> */}
        //             {/* <Input></Input> */}
        //             <Button htmlType="submit">submit</Button>
        //         </Form.Item>
        //     </Form>

        //     <F onFinish={onFinish} onFinishFailed={onFinishFailed} ref={form}>
        //         <F.Item name="username" label="用户名" rules={[{ required: true }]}>
        //             <I status="error"></I>
        //         </F.Item>
        //         <F.Item name="password" label="密码" rules={[{ required: true }]}>
        //             <I></I>
        //         </F.Item>
        //         <F.Item name="check" label="检查" rules={[{ min: 1 }]}>
        //             <I></I>
        //         </F.Item>
        //         <F.Item>
        //             <Button htmlType="submit">submit</Button>
        //         </F.Item>
        //     </F>
        // <CascaderCom></CascaderCom>
        // </div>
        <List></List>
        // <List2></List2>
    );
}

export default App;
