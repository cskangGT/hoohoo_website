const webpack = require('webpack');
const dotenv = require('dotenv');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const fs = require('fs');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

dotenv.config({path: path.join(__dirname, '../.env')});

module.exports = smp.wrap(
  merge(common, {
    mode: 'development',
    devtool: 'source-map',
    cache: {
      type: 'filesystem',
    },
    devServer: {
      compress: true,
      https: {
        key: fs.readFileSync(
          path.resolve(__dirname, '../ssl/web.earthmera.com+3-key.pem'),
        ),
        cert: fs.readFileSync(
          path.resolve(__dirname, '../ssl/web.earthmera.com+3.pem'),
        ),
      },
      historyApiFallback: {
        rewrites: [
          {from: /^\/ko\//, to: '/ko/index.html'},
          {from: /^\/en\//, to: '/en/index.html'},
          {from: /./, to: '/index.html'},
        ],
      },
      hot: true,

      allowedHosts: 'all',
      host: 'web.earthmera.com',
      open: true,
      port: 443,

      static: {
        directory: path.join(__dirname, '../dist'),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx|ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/i,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            cacheCompression: false,
            cacheDirectory: true,
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', {runtime: 'automatic'}],
              '@babel/preset-typescript',
            ],
            plugins: [['babel-plugin-styled-components']],
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    optimization: {
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
    },
    plugins: [],
  }),
);
