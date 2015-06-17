'use strict';

/**
 * Module dependencies.
 */
import chalk from 'chalk';

var init = require('./config/init')(),
    config = require('./config/config');

/**
 * Booting Server
 */
// Init the express application test
const app = require('./config/express')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log(chalk.black.bgWhite('SimplePaas application started on port '
    + config.port));