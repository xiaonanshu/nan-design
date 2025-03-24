import React from 'react';
import { Button, Flex } from '@nan-design/react';
import {
    ArrowDoubleLeftIcon,
    ArrowDoubleRightIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CleanFillIcon,
    CleanIcon,
    CloseIcon,
    DeleteIcon,
    ErrorIcon,
    PrimaryIcon,
    SelectIcon,
    SuccessIcon,
    ViewIcon,
    ViewOffIcon,
    WarningIcon
} from '@nan-design/icons';

const map = {
    ArrowDoubleLeftIcon,
    ArrowDoubleRightIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CleanFillIcon,
    CleanIcon,
    CloseIcon,
    DeleteIcon,
    ErrorIcon,
    PrimaryIcon,
    SelectIcon,
    SuccessIcon,
    ViewIcon,
    ViewOffIcon,
    WarningIcon
};

const Icons = () => {
    const clipboard = navigator.clipboard || {
        writeText: (text) => {
            const copyInput = document.createElement('input');
            copyInput.value = text;
            document.body.appendChild(copyInput);
            copyInput.select();
            document.execCommand('copy');
            document.body.removeChild(copyInput);
        }
    };
    return (
        <>
            <Flex wrap="wrap" gap={10}>
                {(Object.keys(map) as Array<keyof typeof map>).map((item, index) => {
                    return (
                        <Button
                            type="outline"
                            style={{
                                width: 200,
                                height: 100,
                                fontSize: 20,
                                color: '#000'
                            }}
                            key={index}
                            onClick={() => {
                                console.log(Navigator);
                                clipboard.writeText(`<${item} />`);
                                alert('复制成功');
                            }}
                        >
                            <Flex vertical justify="center" align="center">
                                {React.createElement(map[item])}
                                <span style={{ fontSize: 12 }}>{item}</span>
                            </Flex>
                        </Button>
                    );
                })}
            </Flex>
        </>
    );
};

export default Icons;
