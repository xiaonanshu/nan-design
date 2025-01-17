import './App.css';
import React from 'react';
import { Input, Form } from 'antd';
import { Input as I, Form as F, Button } from '@nan-design/react';
import { useState } from 'react';
import { DeleteIcon } from '@nan-design/icons';
import { FormRef } from '../../packages/nan-design/src/components/form/interface';
import CascaderCom from './components/Cascader';

function App() {
    return <CascaderCom></CascaderCom>;
}

export default App;
