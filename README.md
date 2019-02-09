# webpack-demos
demos for webpack4

## How to use
```bash
# clone the repository
git clone git@github.com:8788/webpack-demos.git

# install dependencies
cd basic/
npm install

# build for production
npm run build
```

## Index

1. [zero-config](./zero-config)
1. [basic](./basic)
1. [loader](./loader)
1. [plugins](./plugins)
1. [dev-server](./dev-server)
1. [extract-css](./extract-css)
1. [image-base64](./image-base64)
1. [es6+](./es6+)
1. [lazy-loading](./lazy-loading)
1. [writing-a-loader](./writing-a-loader)
1. [writing-a-plugin](./writing-a-plugin)

## zero-config

```javascript
// package.json
{
  // ...
  "scripts": {
    "build": "webpack --mode production"
  },
  // ...
}
```

```bash
npm run build
```

## basic

```javascript
// webpack.config.js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  }
}
```

## loader

```javascript
// webpack.config.js
const path = require('path')

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
  }
}
```

## plugins

```javascript
// webpack.config.js
const path = require('path')
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
    })
  ]
}
```

## dev-server

```javascript
// webpack.config.js
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
```

## extract-css

```javascript
// webpack.config.js
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: '127.0.0.1',
    port: 8081,
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    hot: true,
    disableHostCheck: true
  }
}
```

## image-base64

```javascript
// webpack.config.js
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

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
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4 * 1024, // inline files smaller than 4k
              name: '[name].[hash:6].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 4 * 1024, // inline files smaller than 4k
              name: '[name].[hash:6].[ext]'
            }
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new OptimizeCSSAssetsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: '127.0.0.1',
    port: 8081,
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    hot: true,
    disableHostCheck: true
  }
}
```
