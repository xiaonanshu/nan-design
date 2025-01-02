import React, { useEffect } from 'react';
import PageJumperProps from './interface';
import './style/index.scss';
import { createCssSCope } from '../../../utils/bem';
import { isInteger } from '../../../utils/helper';

const PageJumper: React.FC<PageJumperProps> = (props) => {
    const { size, show, jumpCallback } = props;
    const [targetPage, setTargetPage] = React.useState<string>('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const input = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTargetPage(e.target.value);
    };

    const jumper = () => {
        if (isInteger(targetPage)) {
            jumpCallback?.(parseInt(targetPage));
        }
        inputRef.current!.value = '';
    };

    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            jumper();
        }
    };

    useEffect(() => {
        const inputElement = inputRef.current;
        inputElement?.addEventListener('blur', jumper);
        inputElement?.addEventListener('keypress', handleEnter);
        return () => {
            inputElement?.removeEventListener('blur', jumper);
            inputElement?.removeEventListener('keypress', handleEnter);
        };
    });

    const bem = createCssSCope('pagination-pagejumper');
    const className = bem([size]);

    return (
        <>
            {show && (
                <div className={className}>
                    前往
                    <input
                        ref={inputRef}
                        type="text"
                        onChange={(e) => {
                            input(e);
                        }}
                        className={bem('input')}
                    />
                    页
                </div>
            )}
        </>
    );
};

export default PageJumper;
