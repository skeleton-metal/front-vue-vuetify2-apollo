module.exports = {
  devServer: {
    host: 'localhost'
  },
  "transpileDependencies": [
    "vuetify"
  ],
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