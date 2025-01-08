import './App.css';
import CascaderCom from './components/Cascader';
import { Pagination } from '@nan-design/react';

function App() {
    return (
        <>
            <CascaderCom></CascaderCom>
            <div>
                <Pagination total={80} disabled></Pagination>
            </div>
        </>
    );
}

export default App;
