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
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'en/index.html',
      templateParameters: {
        lang: 'en',
        title: 'EarthMera | Every eco-action, all here.',
        description: 'Start your carbon-reducing journey today and make a real impact!',
        ogLocale: 'en_US'
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'ko/index.html',
      templateParameters: {
        lang: 'ko',
        title: 'EarthMera | 모든 친환경 활동, 여기 다 있습니다.',
        description: '오늘부터 탄소 저감 여정을 시작하고 실질적인 변화를 만들어보세요!',
        ogLocale: 'ko_KR'
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      templateParameters: {
        lang: 'en',
        title: 'EarthMera | Every eco-action, all here.',
        description: 'Start your carbon-reducing journey today and make a real impact!',
        ogLocale: 'en_US'
      }
    }),
    new CopyWebpackPlugin({
      patterns: [{from: './public/Images', to: 'Images'}],
    }),
    new ProgressPlugin(true),
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
    }),
  ],
  performance: {
    hints: false,
  },
};
