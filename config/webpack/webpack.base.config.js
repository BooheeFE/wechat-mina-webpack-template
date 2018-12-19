const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EventHooksPlugin = require('event-hooks-webpack-plugin');
const rd = require('rd');
let srcDir = path.resolve('src');
let entryList = {};
rd.eachFileFilterSync(
  srcDir,
  /(pages|app|components)[-a-z0-9_./]*\.scss$/,
  f => {
    let filePath = f.slice(srcDir.length + 1); // 去掉目录名得到的就是相对路径
    Object.assign(entryList, { [filePath]: `./src/${filePath}` });
  }
);

const relativeFileLoader = (ext = '[ext]') => {
  return {
    loader: 'file-loader',
    options: {
      useRelativePath: true,
      name: `[name].${ext}`,
      context: srcDir
    }
  };
};

module.exports = {
  entry: entryList,
  output: {
    path: path.resolve('dist'),
    filename: '[name]'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: /src/,
        use: [
          relativeFileLoader('wxss'),
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'compressed'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, '../postcss.config.js')
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: /src/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.wxml$/,
        include: /src/,
        loader: 'wxml-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: '',
          to: '',
          test: /^(pages|app|components)[-a-z0-9_./]*\.(wxml|json|js)$/
        }
      ],
      {
        context: srcDir
      }
    ),
    new webpack.DefinePlugin({
      // 定义环境变量
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new EventHooksPlugin({
      emit: compilation => {
        // compilation.chunks 存放所有代码块，是一个数组
        compilation.chunks.forEach(function(chunk) {
          // chunk 代表一个代码块
          chunk.files.forEach(function(filename) {
            // compilation.assets 存放当前所有即将输出的资源，是一个对象
            let regex = /\.scss$/;
            if (regex.test(filename)) {
              delete compilation.assets[filename];
            }
          });
        });
      }
    })
  ],
  resolve: {
    alias: {
      '/src': '../../src/'
    }
  }
};