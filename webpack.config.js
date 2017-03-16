const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HappyPack = require('happypack');
module.exports = {
    entry: ["babel-polyfill", "./src/App.js"],
    output: {
        path: path.join(__dirname, 'build'),
        filename: "App.js"
    },
    watch: true,
    devtool: 'source-map',
    resolve: {
        alias: {
            'react': 'react-lite',
            'react-dom': 'react-lite'
        },
        extensions: [".webpack.js", ".web.js", '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js(x)*$/,
            loader: 'babel-loader',
            // exclude: /node_modules/,
            query: {
                presets: ['react', 'es2015-ie', 'stage-1', 'es2017'],
                "plugins": [
                    "add-module-exports",
                    "transform-decorators-legacy",
                    "transform-class-properties",
                    "transform-object-rest-spread"
                ]
            }
        }]
    },
    plugins: [
        //     new webpack.optimize.UglifyJsPlugin({
        //         compress: {
        //             warnings: false
        //         },
        //         except: ['$super', '$', 'exports', 'require']
        //     }),
        new HappyPack({ loaders: ['babel-loader'], threads: 4 }),
        new DashboardPlugin()
    ]
};