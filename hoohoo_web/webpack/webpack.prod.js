const webpack = require('webpack');
const dotenv = require('dotenv');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

dotenv.config({path: path.join(__dirname, '../.env')});
const metas = {
  en: {
    lang: 'en',
    title: 'EarthMera | Every eco-action, all here.',
    description: 'Start your carbon-reducing journey today and make a real impact!',
    ogLocale: 'en_US',
    // (필요하면 og:image 등도 추가)
  },
  ko: {
    lang: 'ko',
    title: 'EarthMera | 모든 친환경 활동, 여기 다 있습니다.',
    description: '오늘부터 탄소 저감 여정을 시작하고 실질적인 변화를 만들어보세요!',
    ogLocale: 'ko_KR',
  },
};
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
            ['@babel/preset-react', {runtime: 'automatic'}],
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
    // 1) 언어별 index.html 생성
    ...Object.entries(metas).map(([key, meta]) =>
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        filename: key === 'en' ? 'index.html' : `${key}/index.html`,
        templateParameters: meta,
        inject: 'body',
      })
    ),

    // 2) public 폴더의 나머지(static assets) 복사
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          globOptions: {
            ignore: [
              '**/index.html',      // HTML은 위에서 처리했으니 제외
            ],
          },
        },
      ],
    }),

    // 3) 타입체크 플러그인
    new ForkTsCheckerWebpackPlugin(),
  ],
});
