export default {
    extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
    overrides: [
        {
            files: ['*.scss'],
            extends: ['stylelint-config-standard-scss']
        }
    ],
    rules: {
        // 禁用注释前的空行规则
        'comment-empty-line-before': null,
        // 禁用声明前的空行规则
        'declaration-empty-line-before': null,
        // 指定函数名的大小写为小写
        'function-name-case': 'lower',
        // 禁用选择器特异性递减规则
        'no-descending-specificity': null,
        // 禁用无效的双斜杠注释规则
        'no-invalid-double-slash-comments': null,
        // 指定规则前需要空行
        'rule-empty-line-before': 'always',
        'declaration-block-no-duplicate-properties': true,
        'scss/dollar-variable-pattern': null,
        // 禁用选择器只能使用-
        'selector-class-pattern': null
    }
};
