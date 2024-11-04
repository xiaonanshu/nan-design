import { Button } from '@nan-design/react';
import './App.css';
import { useState } from 'react';
function App() {
    const [loading, setLoading] = useState(true);
    const click = () => {
        alert('1111111');
    };
    setTimeout(() => {
        setLoading(false);
    }, 2000);
    return (
        <>
            <Button
                loading={loading}
                loadingText="加载中"
                onClick={() => {
                    click();
                }}
            >
                弹框
            </Button>
        </>
    );
}

export default App;
