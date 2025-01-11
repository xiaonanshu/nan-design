// 根据传入的默认选中值数组得到默认选中的option数组
import { Option } from '../interface';

const getSelected = <T extends Option>(
    defaultValue: T['value'][] | T['value'][][] = [],
    options: T[],
    selected: T[] = [],
    defaultValueIndex: number = 0
): T[] => {
    if (
        !defaultValue ||
        defaultValue.length === 0 ||
        options.length == 0 ||
        defaultValueIndex >= defaultValue.length
    ) {
        return selected;
    }
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === defaultValue[defaultValueIndex]) {
            selected.push(options[i]);
            return getSelected(
                defaultValue,
                (options[i].children as T[]) || [],
                selected,
                defaultValueIndex + 1
            );
        }
    }
    return [];
};
export default getSelected;
