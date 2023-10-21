const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    devServer: {
        compress: true,
        port: 9000,
        static: {
            directory: path.join(__dirname, './dist'),
        },
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.(svg|png|jpg|gif|mp4)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 4000,
                        fallback: 'file-loader',
                        name: 'Images/[name].[hash:8].[ext]'
                    },
                },
            ]
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.tsx|ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            exclude: /node_modules/,
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
    }),
    new Dotenv({
        path: './.env', // Path to .env file (this is the default)
    }),
    new CopyWebpackPlugin({
        patterns: [
            { from: 'public/Images', to: 'Images' }
        ]
    })
    ]
}