'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './client/src/index.tsx'],
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/dist/',
        filename: 'index_bundle.js'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [ /node_modules/, "./clinet/**/*.test.*"],
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: path.join(__dirname, './client/tsconfig.json')  
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/client/src/index.html')
        })
    ]
};
