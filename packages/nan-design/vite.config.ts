import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
    // 增加插件的使用
    plugins: [
        react(),
        eslintPlugin({
            include: ['src/**/*.js', 'src/**/*.tsx', 'src/**/*.ts'], // 指定需要检查的文件
            exclude: ['node_modules/**', 'dist/**'], // 指定不需要检查的文件
            fix: true, // 是否自动修复
            cache: false // 是否启用缓存
        })
    ],
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'nanDesign',
            fileName: 'nan-design'
        },
        minify: false,
        rollupOptions: {
            external: [
                // 除了 @nan-design/shared，未来可能还会依赖其他内部模块，不如用正则表达式将 @nan-design 开头的依赖项一起处理掉
                /@nan-design.*/,
                'react',
                'react-dom'
            ]
        }
    }
});
