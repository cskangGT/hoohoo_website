const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('progress-webpack-plugin');
const Dotenv = require('dotenv-webpack');
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
          path.resolve(__dirname, '../ssl/localhost+2-key.pem'),
        ),
        cert: fs.readFileSync(
          path.resolve(__dirname, '../ssl/localhost+2.pem'),
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
      host: '0.0.0.0',
      open: true,
      port: 3000,
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
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'en/index.html',
        templateParameters: {
          lang: 'en',
          title: 'EarthMera | Every eco-action, all here.',
          description:
            'Start your carbon-reducing journey today and make a real impact!',
          ogLocale: 'en_US',
          ogImage: 'https://www.earthmera.com/Images/opengraph_image.png',
          ogUrl: 'https://www.earthmera.com/en/',
          ogSiteName: 'EarthMera',
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'ko/index.html',
        templateParameters: {
          lang: 'ko',
          title: '어스메라 | 지구를 지키는 행동, 모두 이곳에서',
          description:
            '지금 바로 CO₂ 저감 여정을 시작하고, 의미 있는 변화를 만들어보세요.',
          ogLocale: 'ko_KR',
          ogImage: 'https://www.earthmera.com/Images/opengraph_image.png',
          ogUrl: 'https://www.earthmera.com/ko/',
          ogSiteName: '어스메라',
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        templateParameters: {
          lang: 'ko',
          title: '어스메라 | 지구를 지키는 행동, 모두 이곳에서',
          description:
            '지금 바로 CO₂ 저감 여정을 시작하고, 의미 있는 변화를 만들어보세요.',
          ogLocale: 'ko_KR',
          ogImage: 'https://www.earthmera.com/Images/opengraph_image.png',
          ogUrl: 'https://www.earthmera.com/ko/',
          ogSiteName: '어스메라',
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          {from: './public/Images', to: 'Images'},
          {from: './public/robots.txt', to: ''},
          {from: './public/sitemap.xml', to: ''},
        ],
      }),
      new ProgressPlugin(true),
      new Dotenv({
        path: './.env', // Path to .env file (this is the default)
      }),
    ],
    optimization: {
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
    },
  }),
);
