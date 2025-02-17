/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import dts from 'vite-plugin-dts';

export default defineConfig({
    // 增加插件的使用
    plugins: [
        react(),
        eslintPlugin({
            include: ['src/**/*.js', 'src/**/*.tsx', 'src/**/*.ts'], // 指定需要检查的文件
            exclude: ['node_modules/**', 'dist/**'], // 指定不需要检查的文件
            fix: true, // 是否自动修复
            cache: false // 是否启用缓存
        }),
        dts({
            entryRoot: './src',
            outDir: ['./dist/es', './dist/lib'],
            //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
            tsconfigPath: '../../tsconfig.build.json'
        }),
        {
            name: 'style',
            generateBundle(config, bundle) {
                //这里可以获取打包后的文件目录以及代码code
                const keys = Object.keys(bundle);

                for (const key of keys) {
                    const bundler: any = bundle[key as any];
                    //rollup内置方法,将所有输出文件code中的.less换成.css,因为我们当时没有打包less文件

                    this.emitFile({
                        type: 'asset',
                        fileName: key, //文件名名不变
                        source: bundler.code.replace(/\.scss/g, '.css')
                    });
                }
            }
        }
    ],
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'nanDesign',
            fileName: 'nan-design',
            formats: ['es', 'cjs']
        },
        outDir: 'es',
        minify: false,
        emptyOutDir: false,
        rollupOptions: {
            external: [
                // 除了 @nan-design/shared，未来可能还会依赖其他内部模块，不如用正则表达式将 @nan-design 开头的依赖项一起处理掉
                /@nan-design.*/,
                'react',
                'react-dom',
                'react/jsx-runtime',
                'classnames',
                'async-validator',
                /\.scss/
            ],
            output: [
                {
                    //打包格式
                    format: 'es',
                    //打包后文件名
                    entryFileNames: '[name].mjs',
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    exports: 'named',
                    //配置打包根目录
                    dir: './dist/es',
                    preserveModulesRoot: 'src'
                },
                {
                    //打包格式
                    format: 'cjs',
                    //打包后文件名
                    entryFileNames: '[name].js',
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    exports: 'named',
                    //配置打包根目录
                    dir: './dist/lib',
                    preserveModulesRoot: 'src'
                }
            ]
        }
    },
    test: {
        environment: 'jsdom'
    }
});
