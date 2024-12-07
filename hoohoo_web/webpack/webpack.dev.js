const webpack = require('webpack');
const dotenv = require('dotenv');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
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
