/*
* @Author: lushijie
* @Date:   2017-05-16 16:41:23
* @Last Modified by:   lushijie
* @Last Modified time: 2017-05-16 16:43:01
*/
// git config core.filemode false

const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const shell = require('gulp-shell');
const runSequence = require('gulp-run-sequence');
const argv = require('yargs').argv;
const os = require('os');
const gutil = require('gulp-util');

const webpackConfig = require('./webpack2.config.js');
const compiler = webpack(webpackConfig);
const userName = argv.user || 'lushijie';
const remoteIP = argv.ip || 'your ip';

const localBasePath = path.join(__dirname, '/public/'),
    localSyncPath = path.join(localBasePath, '/static/js'),
    remoteBasePath = ' ' + userName + '@' + remoteIP + ':/home/lushijie/pc_news/trunk/public',
    remoteSyncPath = ' ' + path.join(remoteBasePath, '/static/');

gulp.task('watch:webpack', function() {
    webpack(Object.assign({}, webpackConfig, {
        watch: true
    })).watch(100, function(err, stats) {
        console.log(chalk.green('\n======start webpack编译======'));
        let warningFirst = stats.compilation.warnings[0];
        warningFirst && console.log(warningFirst.message);
        let errorFirst = stats.compilation.errors[0];
        errorFirst && console.log(errorFirst.message);
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        console.log(chalk.green('======end webpack======\n'));
        gulp.run('rsync');
    });
});

gulp.task('rsync', shell.task([
  "rsync -avH " + localSyncPath + remoteSyncPath,
]))

gulp.task('default', function(cb) {
    runSequence(
      'watch:webpack',
      cb
    );
});
