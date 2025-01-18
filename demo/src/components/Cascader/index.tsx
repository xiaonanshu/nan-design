import { Cascader } from 'antd';
import { Cascader as Cas } from '@nan-design/react';

interface Option {
    value: string;
    label: string;
    disabled?: boolean;
    children?: Option[];
    disableCheckbox?: boolean;
}

const options: Option[] = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake'
                    }
                ]
            }
        ]
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                disableCheckbox: true,
                children: [
                    {
                        value: 'zhonghuamen1',
                        label: 'Zhong Hua Men1',
                        children: [
                            {
                                value: '1',
                                label: '2'
                            }
                        ]
                    },
                    {
                        value: 'zhonghuamen2',
                        label: 'Zhong Hua Men2'
                    },
                    {
                        value: 'zhonghuamen3',
                        label: 'Zhong Hua Men3'
                    },
                    {
                        value: 'zhonghuamen4',
                        label: 'Zhong Hua Men4'
                    },
                    {
                        value: 'zhonghuamen5',
                        label: 'Zhong Hua Men5'
                    },
                    {
                        value: 'zhonghuamen6',
                        label: 'Zhong Hua Men6'
                    },
                    {
                        value: 'zhonghuamen7',
                        label: 'Zhong Hua Men7'
                    },
                    {
                        value: 'zhonghuamen8',
                        label: 'Zhong Hua Men8'
                    },
                    {
                        value: 'zhonghuamen9',
                        label: 'Zhong Hua Men9'
                    }
                ]
            },
            {
                value: 'suzhou',
                label: 'Suzhou',
                children: [
                    {
                        value: 's',
                        label: 's'
                    }
                ]
            }
        ]
    }
];
const CascaderCom = () => {
    const onChange = (value: Option['value'][][], option: Option[]) => {
        console.log(value, option);
    };

    return (
        <div style={{ marginLeft: '50px' }}>
            <Cascader
                options={options}
                onChange={onChange}
                defaultValue={[
                    ['jiangsu', 'nanjing', 'zhonghuamen5'],
                    ['jiangsu', 'nanjing', 'zhonghuamen1']
                ]}
                autoFocus
                placeholder="Please select"
                // expandTrigger="hover"
                changeOnSelect
                multiple={true}
            />
            <Cas
                options={options}
                defaultValue={[
                    ['jiangsu', 'nanjing', 'zhonghuamen5'],
                    ['jiangsu', 'nanjing', 'zhonghuamen1']
                ]}
                onChange={onChange}
                // expandTrigger="hover"
                multiple={true}
                // changeOnSelect
            ></Cas>
        </div>
    );
};

export default CascaderCom;
