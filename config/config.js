'use strict';

/**
 * Module dependencies.
 */
import _ from 'lodash';
import glob from 'glob';

var allEnv = require('./env/all'),
    extendEnv = require('./env/' + process.env.NODE_ENV) || {};

/**
 * Load app configurations
 */
module.exports = _.extend(
    allEnv,
    extendEnv
);

/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = (globPatterns, removeRoot) => {
    // For context switching
    var _this = this;

    // URL paths regex
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    // The output array
    var output = [];

    // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob 
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(globPattern => {
            output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            glob(globPatterns, {
                sync: true
            }, (err, files) => {
                if (removeRoot) {
                    files = files.map(file => {
                        return file.replace(removeRoot, '');
                    });
                }

                output = _.union(output, files);
            });
        }
    }

    return output;
};
