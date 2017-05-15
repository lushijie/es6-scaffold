/*
* @Author: lushijie
* @Date:   2017-05-12 14:00:40
* @Last Modified by:   lushijie
* @Last Modified time: 2017-05-15 09:57:53
*/
let webpack = require('webpack');
let path = require('path');
let STATIC_ROOT = path.join(__dirname, 'www/static');
let OPTIONS = require('./webpack/webpack2.options.js');
let PLUGINS = require('./webpack/webpack2.plugins.js');
let argv = require('yargs').argv;
const isDev = (argv.env === 'development');


module.exports = function(env) {
  let workflow =  {
    entry: {
      index: `${STATIC_ROOT}/es/test.es`,
      'sub/test': `${STATIC_ROOT}/es/sub/test.es`,
      // vendors: [
      //   'moment',
      // ]
    },
    output: {
      publicPath: '/static/js',
      path: `${STATIC_ROOT}/js`,
      filename: '[name].bundle.js',
      chunkFilename: '[name].[chunkhash:8].chunk.js',
    },
    module: {
      rules: [
        {
          test: /\.(j|e)s$/,
          enforce: 'pre',
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        },
        {
          test: /\.(j|e)s$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.s?css$/,
          use:[
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDev ? true : false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDev ? true : false,
                plugins: function() {
                  return [
                    require('cssnano'),
                    require('precss'),
                    require('postcss-cssnext')
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev ? true : false
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=8192&name=./img/[name].[ext]'
        }
      ]
    },
    resolve: {
      extensions: ['.es', '.js', '.css', '.scss'],
      alias: {
        'base': path.join(__dirname),
      }
    },
    devtool: isDev ? 'inline-source-map' : 'cheap-module-source-map',
    plugins: [
      PLUGINS.hotModuleReplacementPluginConf(), // don't install webpack-dev-server with -g !
      // PLUGINS.commonsChunkPluginConf({
      //   name: 'vendors',
      //   filename: 'vendors.bundle.js'
      // }),
      // Pconf.compressionWebpackPluginConf(), //gzip
      PLUGINS.uglifyJsPluginConf(),
      PLUGINS.definePluginConf(OPTIONS.definePluginOptions),
    ],
    devServer: {
      stats: {
        cached: false,
        colors: true
      },
      hot: true,
      inline: true,
      compress: true,
      contentBase: '.',
      port: 5050,
      host: '0.0.0.0',
      headers: {
        "X-WEB-SERVER": "webpack-dev-server"
      },
      // proxy: {
      //   '/static/**': {
      //     target: 'http://127.0.0.1:5050/resources/',
      //     secure: false,
      //     changeOrigin: true,
      //     pathRewrite: {"^/static" : ""}
      //   }
      // }
    }
  }
  workflow.plugins = workflow.plugins.concat(PLUGINS.htmlWebPackPluginConf(OPTIONS.htmlPluginOptions));
  return workflow;
}
