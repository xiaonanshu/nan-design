interface PaginationProps {
    size?: 's' | 'm'; // 分页器大小
    total: number; // 总数量
    current?: number; // 当前页数
    defaultCurrent?: number; //默认当前页数
    pageSize?: number; // 每页条数
    defaultPageSize?: number; // 默认的每页条数
    pageSizeOptions?: number[]; // 数据条数选择器的选项列表
    showQuickJumper?: boolean; // 是否可以快速跳转至某页
    disabled?: boolean; // 禁用分页
    hideOnSinglePage?: boolean; // 只有一页时是否显示分页器
    showTotal?: boolean; // 是否显示总页数
    onChange?: (page: number, pageSize: number) => void; // 页码或者每页条数改变时触发的回调
    pageSizeChange?: (pageSize: number) => void; // pageSize改变时触发的回调
    style: React.CSSProperties;
}
export default PaginationProps;
