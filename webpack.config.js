const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Conway",
    }),
  ],
};
