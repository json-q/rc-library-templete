const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const through2 = require('through2');

const paths = {
  dest: {
    lib: 'lib',
    esm: 'es',
    dist: 'dist',
  },
  compileStyles: 'src/**/index.less', // 编译样式的入口文件
  copyStyles: 'src/**/*.less', // 样式文件路径
  scripts: ['src/**/*.{ts,tsx,js,jsx}'], // 脚本文件路径
};

/**
 * 编译脚本文件
 * @param {("esm"|"cjs")} babelEnv babel环境变量
 * @param {String} destDir 目标目录
 */
function compileScripts(babelEnv, destDir) {
  const { scripts } = paths;
  process.env.BABEL_ENV = babelEnv;

  return gulp
    .src(scripts)
    .pipe(babel())
    .pipe(
      through2.obj(function (file, encoding, next) {
        this.push(file.clone());

        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(cssInjection(content)); // 文件内容处理
          file.path = file.path.replace(/index\.js/, 'css.js'); // 文件重命名
          this.push(file); // 新增该文件
          next();
        } else {
          next();
        }
      }),
    )
    .pipe(gulp.dest(destDir));
}

/**
 * 编译cjs
 */
function compileCJS() {
  const { dest } = paths;
  return compileScripts('cjs', dest.lib);
}

/**
 * 编译esm
 */
function compileESM() {
  const { dest } = paths;
  return compileScripts('esm', dest.esm);
}

/**
 * 拷贝less文件
 */
function copyLess() {
  return gulp.src(paths.copyStyles).pipe(gulp.dest(paths.dest.lib)).pipe(gulp.dest(paths.dest.esm));
}

/**
 * 生成css文件
 */
function less2css() {
  return gulp
    .src(paths.compileStyles)
    .pipe(less()) // 编译 less文件
    .pipe(autoprefixer()) // 根据browserslistrc增加前缀
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm));
}

/**
 * 当前组件样式 import './index.less' => import './index.css'
 * 依赖的其他组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其他组件样式 import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
 * @param {String} content
 */
function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.less/g, '.css');
}

// 串行执行编译脚本任务（cjs,esm） 避免环境变量影响 gulp.series(compileCJS, compileESM)
// 并行任务 后续加入样式处理 可以并行处理  gulp.parallel(...)
const build = gulp.parallel(gulp.series(compileCJS, compileESM), copyLess, less2css);

exports.build = build;

exports.default = build;
