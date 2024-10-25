import React from 'react'
import {hello} from '@nan-design/shared'

const Button = props=>{
    const{
        disable = false,
        children,
        ...restProps
    } = props;

    const handleClick = (e)=>{
        const {onClick} = props;
        if(onClick){
            onClick(e);
        }else{
            hello('nan');
        }
    }

    return <button disabled = {disable} onClick={handleClick} {...restProps}>{children}</button>
}

export { Button };