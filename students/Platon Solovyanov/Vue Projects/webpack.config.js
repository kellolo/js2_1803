let miniCss = require('mini-css-extract-plugin')
let htmlPlugin = require('html-webpack-plugin')
let VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: miniCss.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                /* node_modules - исключить чтоб не обращал внимание и не произошла беда */
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new miniCss({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
        new htmlPlugin({
            template: './src/public/index.html'
        }),
        new VueLoaderPlugin()

    ],
    devServer: {
        open: true,
        hot: true,
        port: 3000
    }
}


// https://www.npmjs.com/package/mini-css-extract-plugin