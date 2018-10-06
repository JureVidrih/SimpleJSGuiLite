let path = require("path");
var webpack = require('webpack');

module.exports = {
  mode: "none",
  entry: "./engine/webpack-entry.js",
  output: {
    path: path.resolve(__dirname, "SimpleJSGui"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
  stats: {
      colors: true
  },
  devtool: 'source-map'
};