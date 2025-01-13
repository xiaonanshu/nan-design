import React from 'react';
import { InputPasswordProp } from './interface';
import { Input } from './Input';
import { ViewIcon, ViewOffIcon } from '../../../../nan-design-icon/src';

const Password: React.FC<InputPasswordProp> = (props) => {
    const { value, visibilityToggle = true, iconRender, suffix, ...restProps } = props;
    const [visible, setVisible] = React.useState<boolean>(false);
    const toggleIconRender = (): InputPasswordProp['iconRender'] => {
        if (!visibilityToggle) {
            return;
        }
        if (iconRender == undefined) {
            const iconRenderFunction = (visible: boolean) => {
                return visible ? <ViewIcon></ViewIcon> : <ViewOffIcon></ViewOffIcon>;
            };
            iconRenderFunction.displayName = 'IconRenderFunction';
            return iconRenderFunction;
        }
        return iconRender;
    };

    const render = toggleIconRender();
    return (
        <Input
            type={visible ? 'text' : 'password'}
            suffix={
                <span>
                    {suffix}
                    <span
                        className="icon-password"
                        onClick={() => {
                            setVisible(!visible);
                        }}
                    >
                        {render && render(visible)}
                    </span>
                </span>
            }
            {...restProps}
        ></Input>
    );
};
export default Password;
