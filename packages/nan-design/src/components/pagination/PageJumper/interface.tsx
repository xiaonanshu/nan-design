interface PageJumperProps {
    size?: 's' | 'm';
    show?: boolean;
    jumpCallback?: (page: number) => void;
    disabled?: boolean;
}

export default PageJumperProps;
