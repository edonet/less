/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-17 11:12:49
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    fs = require('@arted/utils/fs'),
    transform = require('./transform');


/**
 *****************************************
 * 转化文件
 *****************************************
 */
module.exports = async function readFile(src, options = {}) {
    let code = await fs.readFile(src, 'utf-8'),
        transformOptions = {
            ...options,
            sourceOpation: {
                from: src,
                to: options.output || src.replace(/\.less$/, '') + '.min.css'
            }
        };

    // 转化代码
    return await transform(code, transformOptions);
};
