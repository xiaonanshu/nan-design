export const Wraps = ['no-wrap', 'wrap', 'wrap-reverse'] as const;
export type Wrap = (typeof Wraps)[number];

export const Justifies = [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly'
] as const;
export type Justify = (typeof Justifies)[number];

export const Aligns = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'] as const;
export type Align = (typeof Aligns)[number];

export const Gaps = ['small', 'middle', 'large'] as const;
export type Gap = (typeof Gaps)[number];

export const isGap = (value: unknown): value is Gap => {
    return Gaps.includes(value as Gap);
};
