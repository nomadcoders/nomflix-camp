const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");

const MODE = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, "../src/index.js"),
  output: path.join(__dirname, "../dist"),
  template: path.join(__dirname, "../src/index.html")
};

const commonConfig = {
  entry: ["babel-polyfill", PATHS.app],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      }
    ]
  },
  output: {
    path: PATHS.output,
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATHS.template,
      filename: "index.html"
    })
  ]
};

if (MODE === "build") {
  module.exports = merge(commonConfig, prodConfig);
} else if (MODE === "start") {
  module.exports = merge(commonConfig, devConfig);
}
