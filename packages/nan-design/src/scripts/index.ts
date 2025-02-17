import delPath from './utils/delPath';
import { series, parallel, src, dest } from 'gulp';
import { pkgPath, componentPath } from './utils/path';
import glupSass from 'gulp-sass';
import sassLang from 'sass';
import run from './utils/run';
import autoprefixer from 'gulp-autoprefixer';
//删除easyest

export const removeDist = () => {
    return delPath(`${componentPath}/dist`);
};

const sass = glupSass(sassLang);
export const buildStyle = () => {
    return src(`${componentPath}/src/**/**.scss`)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest(`${componentPath}/dist/es`))
        .pipe(dest(`${componentPath}/dist/lib`));
};

//打包组件
export const buildComponent = async () => {
    run('pnpm run build:vite', componentPath);
};
export default series(
    async () => removeDist(),
    parallel(
        async () => buildStyle(),
        async () => buildComponent()
    )
);
