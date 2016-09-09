/*
* @Author: lushijie
* @Date:   2016-02-25 15:33:13
* @Last Modified by:   lushijie
* @Last Modified time: 2016-09-09 09:14:52
*/
/**
 * webpack --display-error-details
 * webpack --progress --colors --watch
 *
 */
var webpack = require('webpack');
var path = require('path');
var Pconf = require('./webpack.plugin.conf.js');

var NODE_ENV = JSON.parse(JSON.stringify(process.env.NODE_ENV || 'development'));
console.log('current ENV:', NODE_ENV);

module.exports = {
    //调试环境：使用 eval 方式可大幅提高持续构建效率
    devtool: 'cheap-module-eval-source-map',

    //线上环境：sourcemap 没有列信息，使用 cheap 模式可以大幅提高 souremap 生成的效率
    //外联.map时，.map文件只会在F12开启时进行下载（sourceMap主要服务于调试），故推荐使用外联.map的形式。
    //devtool: 'cheap-module-source-map',
    context: __dirname,//基础目录（绝对路径），entry根据此路径进行解析
    //entry 情况1,
    //entry 为字符串，生成 common.bundle.js 与 main.bundle.js
    // entry: './resource/js/index.jsx',

    //entry 情况2
    //entry 如果为一个数组，数组中的文件会打包在一起融合到main.bundle.js进入boot，生成common.bundle.js与main.bundle.js
    //entry: ['./public/resource/js/page/home.js','./public/resource/js/page/admin.js'],

    //entry 情况3
    //entry为对象,生成common.bundle.js 与 home.bundle.js 与 admin.bundle.js(home,admin为对象的key)
    entry: {
        index: './resource/js/index.jsx'
        //admin: './public/resource/js/page/admin.js',
        //ventor has problem why?
        // ventor: [
        //     // 引入jQuery
        //     'jquery'
        // ]
    },
    output: {
        publicPath: '/dist/',//webpack-dev-server会使用改路径寻找output 文件
        path: 'dist',// 正式部署时打包进入的文件夹名称
        filename: '[name].bundle.js',//控制的是除common.bundle.js（改文件名就是如此）之外的其他模块的文件名,
        //当时entry使用对象形式时，[hash]不可以使用，[id]、[chunkhash]与[name]可以使用
        chunkFilename: '[name].[chunkhash:8].chunk.js'
    },
    module: {
        // preLoaders: [
        //     {
        //       //babel eslint 校验
        //       test: /\.(js|jsx)$/,
        //       exclude: /node_modules/,
        //       // include: [path.resolve(__dirname, "public/resource/js/page"),path.resolve(__dirname, "public/resource/js/common")],
        //       loader: 'eslint-loader'
        //     }
        // ],
        loaders: [
            // {
            //     test: require.resolve('./public/resource/js/page/home.js'),
            //     loader: "imports?jqueryBak=jquery,testVar=>'sdfsfdsdf',config=>{size:50}"
            // },
            {
                test:/\.css$/,
                //1.css文件外联方式实现
                // loader: Pconf.extractTextPluginConf.extract(['css'])
                //2.css文件内联方式实现
                //loader: "style-loader!css-loader!postcss-loader"同样ok
                loader: "style!css!postcss"
                //可以通过 postcss-js 插件处理写在 js 中的样式loader: "style-loader!css-loader!postcss-loader?parser=postcss-js"
                //也可以通过 babel 结合 postcss-js 处理 es6 语法中的样式loader: "style-loader!css-loader!postcss-loader?parser=postcss-js!babel"
            },
            {
                test:/\.scss$/,
                //1.scss 样式文件外联文件形式
                // loader: Pconf.extractTextPluginConf.extract(['css','sass'])
                //2.scss 样式文件内敛方式实现
                loader: "style!css!sass"
            },
            {
                test: /\.(png|jpg|gif)$/,
                //图片如果小于8192kb将会以base64形式存在，否则产生图片文件
                loader: 'url-loader?limit=8192&name=./img/[name].[ext]'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader', // 'babel' is also a legal name to reference
                // include: [
                //     path.resolve(__dirname, '/public/resource/js'),
                // ],
                exclude: [
                  path.resolve(__dirname, 'node_modules'),
                ],
                // Options to configure babel with
                query: {
                    //如果设置了这个参数，被转换的结果将会被缓存起来。当Webpack 再次编译时，将会首先尝试从缓存中读取转换结果
                    cacheDirectory: true,
                    //与 babel-polyfill 一样，babel-runtime 的作用也是模拟 ES2015 环境。只不过，babel-polyfill 是针对全局环境的,babel-runtime 更像是分散的 polyfill 模块，我们可以在自己的模块里单独引入
                    //通过babel-plugin-transform-runtime插件可以禁用babel向每个文件注入helper
                    plugins: ['transform-runtime'],
                    //其中 babel-preset-es2015 处理 ES6，babel-preset-react 处理 JSX
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
    //     Pconf.definePluginConf,
        Pconf.cleanPluginConf,
    //     Pconf.bannerPluginConf,
    //     Pconf.uglifyJsPluginConf,
    //     Pconf.extractTextPluginConf,
        Pconf.commonsChunkPluginConf,
    //     Pconf.minChunkSizePluginConf,
        Pconf.hotModuleReplacementPluginConf,
    //     Pconf.transferWebpackPluginConf,
    //     Pconf.dedupePluginConf,
    //     Pconf.providePluginConf,
    //     Pconf.htmlWebPackPluginConf
    //     //NODE_ENV ? Pconf.htmlWebPackPluginConf : Pconf.noopPluginConf
    ],
    resolve:{
        root: [
            path.resolve(__dirname)
        ],
        extensions: ['', '.js', '.jsx'],//引用时遇到这些后缀结束的文件可以不加后缀名
        alias:{
             'Rjs': 'public/resource/js',//别名，可在引用的时候使用缩写
             'Rcss': 'public/resource/css',
             'Rimg': 'public/resource/img',
             'components': __dirname + '/components',
             'resource': __dirname + '/resource'
        }
    },
    devServer: {
        // stats: {
        //     cached: false,
        //     colors: true
        // },
        contentBase: '.',//相当于整个devserver的跟目录，默认情况下等于__dirname
        hot: true,
        inline: true,
        port: 5050,
        host: '0.0.0.0',
        // proxy: {
        //       "/proxy": {
        //         ignorePath: true,
        //         target: "http://wan.sogou.com",
        //         secure: false,//optional for https
        //         changeOrigin: true,
        //       }
        // },
        //historyApiFallback: true //如果是index.html直接这一项就可以了
        historyApiFallback: {
            index: '/views/main.html' //tips 这里不要使用__dirname!
            // rewrites: [
            //     { from: /\/soccer/, to: '/soccer.html'}
            // ]
        }
    }
    // ,
    // postcss: function () { // postcss 插件
    //     return [precss, autoprefixer];
    // }
};