import { Option } from '../interface';

const getShowingOptions = <T extends Option>(options: T[], selected: T[]) => {
    const showingOptions: T[][] = [options];
    selected.forEach((item) => {
        if (item.children && item.children.length > 0) {
            showingOptions.push(item.children as T[]);
        }
    });
    return showingOptions;
};

export default getShowingOptions;
