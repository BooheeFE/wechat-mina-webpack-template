const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'none',
  watch: true,
  watchOptions: {
    ignored: ['node_modules', 'dist']
  }
};