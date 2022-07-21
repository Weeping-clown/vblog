const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    host: 'localhost', //
    port: 8080, //
  },
  // chainWebpack: config => {
  //   config.module.rule('md')
  //     .test(/\.md/)
  //     .use('text-loader')
  //     .loader('text-loader')
  // }
  // pluginOptions: {
  //   'style-resources-loader': {

  //   }
  // }
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#6d9772',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
})
