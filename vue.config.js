const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@img': path.resolve(__dirname, '..', 'src', 'assets')
      }
    }
  }
}
