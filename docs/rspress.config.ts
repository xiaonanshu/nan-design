import * as path from 'path';
import { defineConfig } from 'rspress/config';
import { pluginPreview } from '@rspress/plugin-preview';

export default defineConfig({
    plugins: [pluginPreview()],
    base: '/nan-design/',
    root: path.join(__dirname, 'docs'),
    title: 'Nan Design',
    description: 'UI组件库',
    icon: '/nan_design_icon.png',
    logo: {
        light: '/nan_design_logo.png',
        dark: '/nan_design_logo.png'
    },
    themeConfig: {
        socialLinks: [
            { icon: 'github', mode: 'link', content: 'https://github.com/ZSmileL/nan-design' }
        ]
    }
});
