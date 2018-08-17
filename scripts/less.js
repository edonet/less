#!/usr/bin/env node


/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-17 11:24:58
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    argv = require('yargs').argv,
    stdout = require('@arted/utils/stdout'),
    transformFile = require('../lib/transformFile');


/**
 *****************************************
 * 定义脚本
 *****************************************
 */
async function run() {
    let src = argv.src || argv._[0];

    // 存在指定文件
    if (src && src.endsWith('.less')) {
        let dist = argv.dist || argv._[1] || src.replace(/\.less$/, '') + '.css',
            options = argv.config && require(argv.config),
            result;

        // 打印信息
        stdout.block('Lass and Autoprefixer');
        stdout.info(`source: ${src}`);
        stdout.info(`output: ${dist}`);

        // 编译文件
        result = await transformFile(src, dist, options);

        // 编译成功
        stdout.info(`size: ${result.css.length}`);
        stdout.info('compiled successfully!\n');

        // 返回编译结果
        return result;
    }

    // 打印信息
    stdout.warn('--> warn: the file need to compiled not found!');
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = run().catch(stdout.error);
