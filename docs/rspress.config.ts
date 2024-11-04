import * as path from 'path';
import { defineConfig } from 'rspress/config';
import { pluginPreview } from '@rspress/plugin-preview';

export default defineConfig({
    plugins: [pluginPreview()],
    root: path.join(__dirname, 'docs'),
    title: 'Nan Design',
    description: 'UI组件库',
    icon: '/rspress-icon.png',
    logo: {
        light: '/rspress-light-logo.png',
        dark: '/rspress-dark-logo.png'
    },
    themeConfig: {
        socialLinks: [
            { icon: 'github', mode: 'link', content: 'https://github.com/ZSmileL/nan-design' }
        ]
    }
});
