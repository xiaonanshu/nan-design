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
            <Input
                // addonBefore={<span>1</span>}
                // addonAfter={<span>1</span>}
                value={value}
                onChange={onchange}
                defaultValue="ssss"
                allowClear
                maxLength={10}
                // showCount
                prefix={
                    <span>
                        <DeleteIcon></DeleteIcon>
                    </span>
                }
                // suffix={
                //     <span>
                //         <DeleteIcon></DeleteIcon>
                //     </span>
                // }
            ></Input>
            <I
                // addonBefore={<span>1</span>}
                // addonAfter={<span>1</span>}
                maxLength={10}
                value={value}
                defaultValue="ssss"
                onChange={onchange}
                allowClear
                // showCount
                prefix={
                    <span>
                        <DeleteIcon></DeleteIcon>
                    </span>
                }
                // suffix={
                //     <span>
                //         <DeleteIcon></DeleteIcon>
                //     </span>
                // }
            ></I>
        </div>
    );
}

export default App;
