interface CascaderPropBase<T extends { value: string | number }> {
    size?: 's' | 'm'; // 大小
    allowClear?: boolean; // 是否可清除
    changeOnSelect?: boolean; // 点击时改变值
    className?: string; // 自定义类名
    // defaultValue?: T['value'][]; // 默认选项
    disabled?: boolean; //禁用
    expandTrigger?: 'click' | 'hover'; // 次级菜单的打开方式 '点击' | '移入'
    multiple?: boolean; // 是否支持多选
    options?: T[]; // 可选项数据
    placeholder?: string; // 未选择时的展示文字
    onChange?: (value: any, selectedOptions: any) => void; // 选项改变的回调
}

interface SingleSelectCascaderProp<T extends { value: string | number }>
    extends CascaderPropBase<T> {
    multiple?: false;
    defaultValue?: T['value'][]; // 默认选项
}

interface MultipleSelectCascaderProp<T extends { value: string | number }>
    extends CascaderPropBase<T> {
    multiple: true;
    defaultValue?: T['value'][][]; // 默认选项
}

type CascaderProp<T extends { value: string | number }> =
    | SingleSelectCascaderProp<T>
    | MultipleSelectCascaderProp<T>;

type Option = {
    value: string | number;
    label?: React.ReactNode;
    disabled?: boolean;
    children?: Option[];
};

type MultipleSelectedOption<T extends Option = Option> = Omit<T, 'checked'> & {
    checked: 'checked' | 'unCheck' | 'indeterminate';
    disabledCheck?: boolean;
};

type CascaderContextType<T extends Option> =
    | (Pick<CascaderProp<T>, 'disabled' | 'allowClear' | 'expandTrigger' | 'changeOnSelect'> & {
          options: T[];
          setSelectedText: (text: string) => void;
      })
    | null;

export type { CascaderProp, Option, CascaderContextType, MultipleSelectedOption };
