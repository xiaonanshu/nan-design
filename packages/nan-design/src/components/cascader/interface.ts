interface CascaderProp<T extends { value: string | number }> {
    size?: 's' | 'm'; // 大小
    allowClear?: boolean; // 是否可清除
    changeOnSelect?: boolean; // 点击时改变值
    className?: string; // 自定义类名
    defaultValue?: T['value'][]; // 默认选项
    disabled?: boolean; //禁用
    expandTrigger?: 'click' | 'hover'; // 次级菜单的打开方式 '点击' | '移入'
    multiple?: boolean; // 是否支持多选
    options?: T[]; // 可选项数据
    placeholder?: string; // 未选择时的展示文字
    onChange?: (value: T['value'][], selectedOptions: T[]) => void; // 选项改变的回调
}

type Option = {
    value: string | number;
    label?: React.ReactNode;
    disabled?: boolean;
    children?: Option[];
};

// type IntensifyOption<T extends Omit<T, 'children'>> = T & {
//     depth?: number;
//     children?: T[];
//     isSelected?: boolean;
// };

type CascaderContextType<T extends Option> =
    | (Pick<CascaderProp<T>, 'disabled' | 'allowClear' | 'expandTrigger' | 'changeOnSelect'> & {
          options: T[];
          setSelectedText: (text: string) => void;
      })
    | null;

export type { CascaderProp, Option, CascaderContextType };
