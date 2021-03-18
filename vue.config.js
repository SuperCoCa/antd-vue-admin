const CompressionPlugin = require('compression-webpack-plugin')
const Path = require('path')

function resolve(dir) {
  return Path.join(__dirname, './', dir)
}

module.exports = {
  devServer: {
    port: 8000,
  },
  configureWebpack: () => {
    // 提供带 Content-Encoding 编码的压缩版的资源
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 1024,
            deleteOriginalAssets: false,
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    config.module.rules.delete("svg")
    
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}