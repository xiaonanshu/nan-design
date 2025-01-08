import { Option } from '../interface';

// 每层选项框类型
interface OptionsProp<T extends Option> {
    options?: T[];
    onClick?: (option: T, depth: number) => void; // 点击某一选项后的回调
    depth: number;
    selected?: T[];
}

export type { OptionsProp };
