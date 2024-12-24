import { Switch } from '@nan-design/react';
import { SelectIcon, CloseIcon } from '@nan-design/icons';

const SwitchCom = () => {
    return (
        <div style={{ margin: '10px' }}>
            <Switch
                checkedNode={<SelectIcon />}
                unCheckedNode={<CloseIcon />}
                defaultChecked={true}
                size="s"
            ></Switch>
        </div>
    );
};
export default SwitchCom;
