const path = require('path');
const webpack = require('webpack');
const fse = require('fs-extra');

module.exports = {
    entry: "./src/App.tsx",
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'App.[hash].js',
        // filename: 'App.js',
    },
    resolve: {
        alias: {
            'react': 'preact-compat/dist/preact-compat.min',
            'react-dom': 'preact-compat/dist/preact-compat.min'
                // 'react': 'react-lite',
                // 'react-dom': 'react-lite'
        },
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     except: ['$super', '$', 'exports', 'require']
        // }),
        replaceAppPath
    ]
};

const indexDirPathSrc = path.join(__dirname, ".", "/templates/login/login.ftl");
const indexDirPathBuild = path.join(__dirname, ".", "/build/templates/login");
const indexPathBuild = path.join(indexDirPathBuild, ".", "login.ftl");

function replaceAppPath() {

    this.plugin("done", function(stats) {

        fse.copy(path.join(__dirname, ".", "/templates/"), path.join(__dirname, ".", "/build/templates/"), function(err) {
            fse.readFile(indexDirPathSrc, 'utf8', function(err, data) {
                if (err) {
                    return console.log(err);
                }
                fse.ensureDir(indexDirPathBuild, function() {
                    fse.writeFile(indexPathBuild, data.replace('[hash]', stats.toJson().hash), 'utf8', function(err) {
                        if (err) return console.log(err);
                    });
                })
            });
        });


    });

}