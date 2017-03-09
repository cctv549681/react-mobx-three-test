const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: "./src/App.tsx",
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
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: "ts-loader"}
        ]
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         },
    //         except: ['$super', '$', 'exports', 'require']
    //     })
    // ]
};

