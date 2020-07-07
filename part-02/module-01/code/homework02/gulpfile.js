// 实现这个项目的构建任务
const {series,parallel, src,dest} = require('gulp');

//对css执行编译压缩的插件
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');

//对js执行编译压缩的插件
const babel = require('gulp-babel');

//删除文件的插件
const del = require('del');

//对html执行编译的插件
const loadPlugins = require('gulp-load-plugins');
const plugins = loadPlugins();

//模拟服务器功能
const browserSync = require('browser-sync');
const { watch } = require('browser-sync');
const bs = browserSync.create();

const data = {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'Features',
        link: 'features.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
          },
          {
            name: 'About',
            link: 'https://weibo.com/zceme'
          },
          {
            name: 'divider'
          },
          {
            name: 'About',
            link: 'https://github.com/zce'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
  }

//删除文件
const clean = () =>{
    return del(['dist']);
}

//编译html
const html = () =>{
    return src('src/*.html',)
    .pipe(plugins.swig({ data,defaults:{cache:false} }))
    .pipe(dest('dist'))
    .pipe(bs.reload( {stream:true} ))
}

//编译sass文件
const style = () =>{
    return src('src/assets/styles/*.scss')
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(dest('dist/css'))
    .pipe(bs.reload({ stream: true }))
}

//编译js文件
const script = () =>{
    return src('src/assets/scripts/*.js')
    .pipe(babel({presets:['@babel/preset-env']}))
    .pipe(dest('dist/js'))
    .pipe(bs.reload({ stream: true }))
}

//编译其他文件
const font = () =>{
    return src('src/assets/fonts/**')
    // .pipe(plugins.imagemin())
    .pipe(dest('dist/temp'))
}

const extra = () =>{
    return src('public/**')
    .pipe(dest('dist/temp'))
}

//开启服务器并监听文件
const serve = () =>{
    watch('src/assets/style/*.scss',style)
    watch('src/assets/scripts/*.js',script)
    watch('src/*.html',html)
    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
    ],bs.reload)

    bs.init({
        notify:false,
        port:2080,
        server:{
            baseDir:['dist','src','public'],
            routes:{
                '/node_modules':'node_modules'
            }
        }
    })
}

//series():异步编译；parallel():同步编译
const sycnLine = parallel(html,style,script,font,extra);

//先删除之前的dist文件夹，然后再对文件进行编译压缩
const start = series(clean,sycnLine,serve);

module.exports = {
    start
} 