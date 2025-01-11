export interface MultipleItemProps<T> {
    selectedOption?: T;
    deleteSelected?: (option: T) => void;
}

export default MultipleItemProps;
