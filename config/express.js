'use strict';

/**
 * Module dependencies.
 */
import 'babel/register';
import fs from 'fs';
import http from 'http';
import express from 'express';
import jwt  from 'express-jwt';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import flash from 'connect-flash';
import consolidate from 'consolidate';
import path from 'path';
import chalk from 'chalk';
import React from 'react';
import cors from 'cors';
import config from './config';
import App from '../public/components/App';
import rethinkdbService from '../app/services/rethinkdb.server.service.js';

import {secret} from './env/all';

export default function () {
    // Initialize express app
    const app = express();

    // secure based on jwt token
    let jwtCheck = jwt({
        secret: secret
    });
    app.use('/api', jwtCheck);

    // Globbing model files
    config.getGlobbedFiles('./app/models/**/*.js').forEach(modelPath => {
        require(path.resolve(modelPath));
    });

    // Setting application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;

    // Passing the request url to environment locals
    app.use((req, res, next) => {
        res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        next();
    });

    // Should be placed before express.static
    app.use(compress({
        filter: (req, res) => {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    // Showing stack errors
    app.set('showStackError', true);

    // Set swig as the template engine
    app.engine('server.view.html', consolidate[config.templateEngine]);

    // Set views path and view engine
    app.set('view engine', 'server.view.html');
    app.set('views', './app/views');

    // Set content variable
    // var appComp = React.createFactory(App);
    // app.locals.bodyHtml = React.renderToString(appComp());
    app.locals.bodyHtml = '';

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
        // Enable logger (morgan)
        app.use(morgan('dev'));

        // Disable views cache
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // CookieParser should be above session
    app.use(cookieParser());

    // connect flash for flash messages
    app.use(flash());

    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    // enable CORS
    app.use(cors());

    // Setting the app router and static folder
    app.use(express.static(path.resolve('./www')));

    // Globbing routing files
    config.getGlobbedFiles('./app/routes/**/*.js').forEach(routePath => {
        require(path.resolve(routePath))(app);
    });

    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use((err, req, res, next) => {
        // If the error object doesn't exists
        if (!err) return next();
        else {
            if(err.status == 401) {
                res.status(401).json(err);
            }
        }

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    // Assume 404 since no middleware responded
    app.use((req, res) => {
        let returnView = res.status(404);
        let returnData = {
            url: req.originalUrl,
            error: 'Not Found'
        };

        if(req.is('json')) {
            returnView.json('404', returnData);
        } else {
            returnView.render('404', returnData);
        }
    });

    //setup db
    rethinkdbService.setup();

    // Return Express server instance
    return app;
};
