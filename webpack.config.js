const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "out"),
    filename: "potato.js"
  }
};
