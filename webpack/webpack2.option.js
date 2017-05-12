/*
* @Author: lushijie
* @Date:   2017-05-12 14:01:17
* @Last Modified by:   lushijie
* @Last Modified time: 2017-05-12 18:57:26
*/
const path = require('path');
const argv = require('yargs').argv;
const isDev = argv.env === 'development';
const BASE_ROOT = path.join(__dirname, '..');

let defaultHtmlPluginOption = {
  hash: true,
  inject: true,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true
  },
}

let htmlPluginOptions = [
  Object.assign({}, defaultHtmlPluginOption, {
    filename: `${BASE_ROOT}/www/index.bundle.html`,
    title: 'Hello World',
    template: `${BASE_ROOT}/www/index.html`,
    chunks: ['index'],
    excludeChunks: [],
  }),
];

let definePluginOptions = {
  ENV: {
    API: JSON.stringify(isDev ? 'http://127.0.0.1' : 'http://online.com')
  }
};

module.exports = {
  htmlPluginOptions,
  definePluginOptions
};
