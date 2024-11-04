import { expect, test } from 'vitest';
import { createCssSCope } from './bem';

test('button', () => {
    const bem = createCssSCope('button');
    expect(bem(['s', 'primary'], { disabled: true })).toBe(
        'nan-button nan-button--s nan-button--primary nan-button--disabled'
    );
});
