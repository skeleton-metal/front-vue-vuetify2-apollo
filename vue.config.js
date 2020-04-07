module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    disableHostCheck: true
  },
  chainWebpack: (config) => {
    // gql Loader
    config.module
        .rule('gql')
        .test(/\.(graphql|gql)$/)
        .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end();
  }
}
