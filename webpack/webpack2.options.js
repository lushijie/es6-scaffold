/*
* @Author: lushijie
* @Date:   2017-05-12 14:01:17
* @Last Modified by:   lushijie
* @Last Modified time: 2017-05-13 09:28:50
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
  development: {
    ENV: {
      API: JSON.stringify('http://127.0.0.1')
    }
  },
  production: {
    ENV: {
      API: JSON.stringify('http://online.com')
    }
  }
};

function stringifyString(obj) {
  let keys = Object.keys(obj);
  for(let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let tmp = obj[key];
    if(typeof tmp === 'string') {
      obj[key] = JSON.stringify(tmp);
    }else if(Object.prototype.toString.call(tmp) === '[object Object]') {
      stringifyString(tmp);
    }
  }
  return obj;
}

module.exports = {
  htmlPluginOptions,
  definePluginOptions: stringifyString(definePluginOptions[argv.env])
};
