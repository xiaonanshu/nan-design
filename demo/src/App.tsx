import { Button } from '@nan-design/react';
import './App.css';
function App() {
    const click = () => {
        alert('1111111');
    };
    return (
        <>
            <Button onClick={click}>click me</Button>
        </>
    );
}

export default App;
