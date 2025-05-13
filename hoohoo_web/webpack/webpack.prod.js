const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    // new HtmlWebpackPlugin({ 
    //   filename: 'index.html', 
    //   template: path.resolve(__dirname, '../public/index.html'),
    //   templateParameters: metas.en 
    // }),
    // // /en/index.html
    // new HtmlWebpackPlugin({ 
    //   filename: 'en/index.html', 
    //   template: path.resolve(__dirname, '../public/index.html'),
    //   templateParameters: metas.en 
    // }),
    // // /ko/index.html
    // new HtmlWebpackPlugin({ 
    //   filename: 'ko/index.html', 
    //   template: path.resolve(__dirname, '../public/index.html'),
    //   templateParameters: metas.ko 
    // }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'en/index.html',
      templateParameters: {
        lang: 'en',
        title: 'EarthMera | Every eco-action, all here.',
        description: 'Start your carbon-reducing journey today and make a real impact!',
        ogLocale: 'en_US',
        ogImage: 'https://www.earthmera.com/Images/opengraph_image.png',
        ogUrl: 'https://www.earthmera.com/en/',
        ogSiteName: 'EarthMera'
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'ko/index.html',
      templateParameters: {
        lang: 'ko',
        title: '어스메라 | 지구를 지키는 행동, 모두 이곳에서',
        description: '지금 바로 CO₂ 저감 여정을 시작하고, 의미 있는 변화를 만들어보세요.',
        ogLocale: 'ko_KR',
        ogImage: 'https://www.earthmera.com/Images/opengraph_image.png',
        ogUrl: 'https://www.earthmera.com/ko/',
        ogSiteName: '어스메라'
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      templateParameters: {
        lang: 'en',
        title: '어스메라 | 지구를 지키는 행동, 모두 이곳에서',
        description: '지금 바로 CO₂ 저감 여정을 시작하고, 의미 있는 변화를 만들어보세요.',
        ogLocale: 'ko_KR',
        ogImage: 'https://www.earthmera.com/Images/opengraph_image.png',
        ogUrl: 'https://www.earthmera.com/ko/',
        ogSiteName: '어스메라'
      }
    }),
    // 2) public 폴더의 나머지(static assets) 복사
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          globOptions: {
            ignore: [
              '**/index.html',
              '**/en/**',
              '**/ko/**'
            ],
          },
        },
        { from: './public/Images', to: 'Images' },
        { from: './public/robots.txt', to: '' },
        { from: './public/sitemap.xml', to: '' },
      ],
    }),

    // 3) 타입체크 플러그인
    new ForkTsCheckerWebpackPlugin(),
  ],
});
