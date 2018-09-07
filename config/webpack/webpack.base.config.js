const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rd = require('rd');
let srcDir = path.resolve('src');
let entryList = {};
rd.eachFileFilterSync(srcDir, /\.(js|scss)$/, (f) => {
  let filePath = f.slice(srcDir.length + 1); // 去掉目录名得到的就是相对路径
  Object.assign(entryList, {[filePath]: `./src/${filePath}`});
});

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
          }, {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, '../postcss.config.js')
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'app.json', to: '' },
      { from: 'pages/**/*.wxml', to: '' },
      { from: 'pages/**/*.json', to: '' }
    ], {
      context: srcDir
    }),
    new webpack.DefinePlugin({ // 定义环境变量
      'process.env': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};