import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    // 指定文件匹配模式
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx}']
    },
    // 指定全局变量和环境
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
            ecmaVersion: 12, // 使用最新的 ECMAScript 语法
            sourceType: 'module' // 代码是 ECMAScript 模块
        }
    },
    // 使用的扩展配置
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    // 自定义规则
    {
        rules: {
            indent: ['error', 4], // 缩进使用 2 个空格
            quotes: ['error', 'single'], // 使用单引号
            semi: ['error', 'never'], // 语句末尾不加分号
            'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境中警告 console 使用，开发环境中关闭规则
            'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境中警告 debugger 使用，开发环境中关闭规则
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['off'],
            '@typescript-eslint/no-explicit-any': ['off']
        }
    },
    {
        settings: {
            react: {
                version: 'detect'
            }
        }
    },
    {
        ignores: ['**/dist', '**/node_modules']
    },
    eslintPluginPrettierRecommended
];
