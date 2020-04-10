let miniCss = require("mini-css-extract-plugin");
let htmlPlugin = require("html-webpack-plugin");
let VueLoaderPlugin = require("vue-loader/lib/plugin")
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: miniCss.loader,
            options: {
              publicPath: "../",
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new miniCss({
      filename: "css/[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false
    }),
    new htmlPlugin({
      template: "./src/public/index.html"
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    open: true,
    hot: true,
    port: 3000,
    proxy:{
      "/api": {
          target: "http://localhost:8080/",
          pathRewrite: {"^/api" : ""},
          secure: false,
          changeOrigin: true
      }
    }
  }
};
