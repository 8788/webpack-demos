const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          'html-loader',
          {
            loader: path.resolve('./loader/markdown-loader.js')
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: '127.0.0.1',
    port: 81,
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    hot: true
  }
}
