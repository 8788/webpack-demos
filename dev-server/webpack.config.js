const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
    port: 8081,
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    hot: true,
    disableHostCheck: true,
    proxy: {
      // http://127.0.0.1:81/v2/5c0e62192e00005400043e63
      '/v2': {
        target: 'http://www.mocky.io/',
        changeOrigin: true
      }
    },
    before (app) {
      app.get('/api', function(req, res) {
        res.json({ code: 200, msg: 'mock test' })
      })
    }
  }
}