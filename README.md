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