
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var mockObjects = false;
var common = require('./common')
var plugins = []
var MODE_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') > -1

console.log('Launched in ' + (MODE_DEV_SERVER ? 'dev-server' : 'build') + ' mode')

var env = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'dev'

switch (env) {
    case 'production':
        console.log('PRODUCTION MODE')
        break
    case 'test':
        console.log('TEST MODE')
        break
    case 'mock':
        console.log('MOCK MODE')
        break
    default:
        console.log('DEVELOPMENT MODE')
        break
}

var hash = env === 'production' ? '-[hash]' : ''

if (MODE_DEV_SERVER === false) {
    console.log('Cleaning ...')
    var deleted = require('del').sync(['build/*','build/**/*',"!.git/**/*"])
    deleted.forEach(function(e){
        console.log(e)
    })
}

/** plugins setup */

plugins.push(new webpack.NoErrorsPlugin())
// extract css into one main.css file
plugins.push(new ExtractTextPlugin('css/main' + hash + '.css',{
  disable: false,
    allChunks: true
}))
plugins.push(new webpack.BannerPlugin(common.getBanner()));

if(env === 'production'){
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true
    }
  }))
}

/** webpack config */

var resovle = {
    alias: {}
}

resolve.alias['httpServiceConfiguration'] = path.resolve(
    __dirname, './src/services/httpService/config/environment/config' +
    (env === 'prod' ? '.build' : (env === 'mock' ? '.mock' : '.dev' ) ) + '.js');
)

var config = {
    entry: {
        'js/bundle': [
            "./src/bootstrap.js"
        ],
        'css/main': './src/style/main.scss'
    },
    output: {
        publicPath: '/assets/',
        filename: "[name]" + hash + '.js',
        path: './build/assets'
    },
    cache: true,
    debug: env !== 'production',
    devtool: env === 'production' ? false : 'sourcemap',
    devServer: {
        contentBase: './public',
        inline: true
    },
    module: {
        loaders: [
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                loader: 'react-hot!babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('style-loader',
                    "css-loader?sourceMap!sass-loader?sourceMap=true&sourceMapContents=true&outputStyle=expanded&" +
                    "includePaths[]=" + (path.resolve(__dirname, "./node_modules"))
                )
            },
            {
                test: /\.css/,
                loader: 'style-loader!css-loader'
            },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    resolve: resolve,
    plugins: plugins
}

module.exports = config
