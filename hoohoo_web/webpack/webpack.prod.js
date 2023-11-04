const webpack = require('webpack');
const dotenv = require('dotenv');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

dotenv.config({ path: path.join(__dirname, '../.env') });

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                test: /\.tsx|ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3,
                                },
                            },
                        ],
                        ['@babel/preset-react', { runtime: 'automatic' }],
                        '@babel/preset-typescript',
                    ],
                    plugins: [
                        [
                            'babel-plugin-styled-components',
                            {
                                displayName: false,
                                minify: true,
                                transpileTemplateLiterals: true,
                                pure: true,
                            },
                        ],
                    ],
                },
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
    ],
});