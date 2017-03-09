// const ts = require('gulp-typescript');
// const gulp = require('gulp');
// // const rollup = require('rollup');
// // const uglify = require('rollup-plugin-uglify');
// const fs = require('fs');
// const webserver = require('gulp-webserver');
// const rollup = require('rollup-stream');
// const source = require('vinyl-source-stream');
// const buffer = require('vinyl-buffer');
// const sourcemaps = require('gulp-sourcemaps');
//
// // const connect = require("gulp-connect");
// // let Reproxy = require("gulp-connect-reproxy");
// // const watch = require('gulp-watch');
// // const nodeResolve = require('rollup-plugin-node-resolve');
// // const commonjs = require('rollup-plugin-commonjs');
//
// const tsProject = ts.createProject('./tsconfig.json', {
//     module: 'es2015',
//     "target": "es5",
// });
//
// let cache;
//
// gulp.task('ts', function () {
//     return gulp.src(['src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx'])
//         .pipe(tsProject())
//         .js
//         .pipe(gulp.dest('./temp'))
// });
//
// gulp.task('watch', function () {
//     return gulp.watch(['src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx'], reDebug);
// });
//
// gulp.task('debug', ['connect'], function () {
//     return gulp.watch(['src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx'], reDebug);
// });
//
// gulp.task('connect', ['dist'], function () {
//     gulp.src('.')
//         .pipe(webserver({
//             // livereload: true,
//             port: 8888,
//             // directoryListing: true,
//             // open: true,
//             proxies: [{
//                 source: '/api',
//                 target: 'http://192.168.100.122:8092/api'
//             }]
//         }))
//         .on('error', function (e) {
//             console.log('error')
//         })
// });
//
// function reDebug(obj) {
//     if (obj.type === 'changed') {
//         console.log(`start tsc ${obj.path}`);
//         gulp.src(obj.path)
//             .pipe(tsProject())
//             .js
//             .pipe(gulp.dest('./temp'))
//             .on('end', build);
//     }
// }
//
// // gulp.task('rollup', function () {
// //     return rollup({
// //         entry: './temp/App.js',
// //         sourceMap: true
// //     }).pipe(source('App.js', './temp'))
// //         .pipe(buffer())
// //         .pipe(sourcemaps.init({loadMaps: true}))
// //         .pipe(sourcemaps.write('.'))
// //         .pipe(gulp.dest('./build'));
// // });
//
// function build() {
//     rollup({
//         entry: './temp/App.js',
//         sourceMap: true,
//         cache: cache,
//         onwarn: warning,
//         format: 'iife'
//     }).pipe(source('App.js', './temp'))
//         .pipe(buffer())
//         .pipe(sourcemaps.init({loadMaps: true}))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('./build'))
//         .on('end', function () {
//             console.log('finish build');
//         });
// }
//
// gulp.task('build', ['ts'], function () {
//     rollup({
//         entry: './temp/App.js',
//         sourceMap: true,
//         cache: cache,
//         onwarn: warning,
//         format: 'iife'
//     }).pipe(source('App.js', './temp'))
//         .pipe(buffer())
//         .pipe(sourcemaps.init({loadMaps: true}))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('./build'));
// });
//
// function warning(warning) {
//     if (warning.code === 'THIS_IS_UNDEFINED') {
//         return;
//     }
//     console.error(warning.message);
// }
//
// function bundle(bundle) {
//     let result = bundle.generate({
//         format: 'iife',
//         sourceMap: true
//     });
//     cache = bundle;
//     fs.writeFileSync('./build/App.js', result.code);
//     console.log('finish build');
// }
//
// gulp.task("dist", ['ts'], build);

const gulp = require('gulp');
const connect = require('gulp-connect');
const proxy = require('http-proxy-middleware');
const webpack = require('gulp-webpack');

gulp.task('wp-watch', function () {
    return gulp.src('src/App.tsx')
        .pipe(webpack({
            // watch: true,
            devtool: 'source-map',
            resolve: {
                // alias: {
                //     'react': 'preact-compat',
                //     'react-dom': 'preact-compat'
                // },
                extensions: ['', ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
            },
            output: {
                filename: 'App.js',
            },
            module: {
                loaders: [
                    // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                    {test: /\.tsx?$/, loader: "ts-loader"},
                ]
            }
        }))
        .pipe(gulp.dest('build'));
});


gulp.task('wp-server', function () {
    connect.server({
        port: 8888,
        middleware: function (connect, opt) {
            let p = proxy('api', {
                target: '192.168.100.122:8091',
                changeOrigin: true
            });
            return [p]
        }
    });
});

// const browserify = require("browserify");
// const tsify = require("tsify");
//
// gulp.task('bs', function () {
//     return browserify()
//         .add('src/App.tsx')
//         .plugin('tsify')
//         .bundle()
//         .pipe(gulp.dest(__dirname + '/build'));
// });
//
