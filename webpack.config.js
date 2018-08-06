let path = require("path");

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
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['babel-preset-env']
              }
            }
          }
        ]
      }
}