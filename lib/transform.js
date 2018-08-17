/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-17 10:43:21
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    less = require('less'),
    postcss = require('postcss'),
    postcssOptions = require('./postcss.conf');


/**
 *****************************************
 * 转变代码
 *****************************************
 */
module.exports = function transform(code, options = {}) {
    return new Promise((resolve, reject) => {
        less.render(code, { compress: true, ...options.lessOptions }, async (err, res) => {
            if (!err) {
                try {
                    let processor = postcss({ ...postcssOptions, ...options.postcssOptions }),
                        source = { from: 'source.less', to: 'source.css' };

                    // 解析文件
                    return resolve(
                        await processor.process(res.css, { ...source, ...options.sourceOptions })
                    );
                } catch (error) {
                    err = error;
                }
            }

            // 返回错误
            reject(err);
        });
    });
};
