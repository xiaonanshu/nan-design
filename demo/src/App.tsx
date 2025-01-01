import './App.css';
import {
    ErrorIcon,
    PrimaryIcon,
    SuccessIcon,
    WarningIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowDoubleLeftIcon,
    ArrowDoubleRightIcon
} from '@nan-design/icons';
import SwitchCom from './components/Switch';
import { Pagination } from 'antd';
import { Pagination as Pag } from '@nan-design/react';
import PaginationCom from './components/Pagination';

function App() {
    return (
        <>
            <ErrorIcon></ErrorIcon>
            <PrimaryIcon></PrimaryIcon>
            <SuccessIcon></SuccessIcon>
            <WarningIcon></WarningIcon>
            <SwitchCom></SwitchCom>
            <Pagination total={100}></Pagination>
            {/* <PaginationCom></PaginationCom> */}
            <Pag total={100}></Pag>
            <ArrowLeftIcon></ArrowLeftIcon>
            <ArrowRightIcon></ArrowRightIcon>
            <ArrowDoubleLeftIcon></ArrowDoubleLeftIcon>
            <ArrowDoubleRightIcon></ArrowDoubleRightIcon>
        </>
    );
}

export default App;
