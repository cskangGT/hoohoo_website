const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('progress-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/ko($|\/)/, to: '/ko/index.html' },
        { from: /^\/en($|\/)/, to: '/en/index.html' },
        { from: /./, to: '/index.html' },
      ],
    },
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
        test: /\.(png|webp|jpe?g|svg)$/,
        type: 'asset',
        generator: {
          filename: '/Images/[name][hash][ext]',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  
  performance: {
    hints: false,
  },
};
