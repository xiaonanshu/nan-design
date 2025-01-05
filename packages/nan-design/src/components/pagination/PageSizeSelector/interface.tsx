interface PageSizeSlectorProps {
    pageSizeOptions?: number[]; // 可供选择的每页大小列表
    currentPageSize: number; // 当前每页大小
    pageSizeChange: (pageSize: number) => void; // pageSize改变的回调
    size?: 's' | 'm';
    disabled?: boolean;
}

export default PageSizeSlectorProps;
