import { Option } from '../interface';
import { MultipleSelectedOption } from '../interface';

// 每层选项框类型
interface OptionsProp<T extends Option> {
    options?: T[];
    onClick?: (option: T, depth: number) => void; // 点击某一选项后的回调
    depth: number;
    selected?: T[];
    multipleOptions?: MultipleSelectedOption<T>[];
    multipleClick?: (option: T, checkStatus: 'checked' | 'unCheck' | 'indeterminate') => void;
}

interface CheckBoxProp<T extends Option> {
    checked: MultipleSelectedOption<T>['checked'];
    onChange?: () => void;
    disabledCheck?: boolean;
}

export type { OptionsProp, CheckBoxProp };
