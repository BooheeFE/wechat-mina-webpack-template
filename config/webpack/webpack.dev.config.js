const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    ignored: ['node_modules', 'dist']
  }
};