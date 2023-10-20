const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('progress-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    devServer: {
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: true,
        port: 3000,
        static: {
            directory: path.join(__dirname, './dist'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|webp)$/,
                type: 'asset',
                generator: {
                    filename: 'Images/[name][hash][ext]',
                },
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './public/Images', to: 'Images' },
            ],
        }),
        new ProgressPlugin(true),
    ],
    performance: {
        hints: false,
    },
};