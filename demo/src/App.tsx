import './App.css';
import { Input } from 'antd';
import { Input as I } from '@nan-design/react';
import { useState } from 'react';
import { DeleteIcon } from '@nan-design/icons';

function App() {
    const [value, setValue] = useState('100');
    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        setValue(e.target.value);
        console.log(e.target.value);
        console.log(value);
    };
    return (
        <div style={{ width: '500px' }}>
            <Input.Password showCount allowClear maxLength={16}></Input.Password>
            <I.Password showCount allowClear maxLength={16} onChange={onchange}></I.Password>
            <I addonAfter={<span>1</span>} addonBefore={<span>1</span>}></I>
            <Input addonAfter={<span>1</span>} addonBefore={<span>1</span>}></Input>
        </div>
    );
}

export default App;
