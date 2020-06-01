module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    // assetsDir: process.env.NODE_ENV === 'production' ? '/' : '/',
    productionSourceMap : process.env.NODE_ENV === 'production' ? false : true,
    filenameHashing: false,
    lintOnSave : false,
    // chainWebpack: (config) => {
    //   const svgRule = config.module.rule('svg');
  
    //   svgRule.uses.clear();
  
    //   svgRule
    //     .use('babel-loader')
    //     .loader('babel-loader')
    //     .end()
    //     .use('vue-svg-loader')
    //     .loader('vue-svg-loader');
    // },
  }
  