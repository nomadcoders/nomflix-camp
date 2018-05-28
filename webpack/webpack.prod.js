const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractWebpackPlugin = require("extract-text-webpack-plugin");

const PATHS = {
  build: path.join(__dirname, "../dist")
};

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractWebpackPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                minimize: true
              }
            },
            {
              loader: "postcss-loader"
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(PATHS.build, {
      root: process.cwd()
    }),
    new ExtractWebpackPlugin("styles.css")
  ]
};
