'use strict';

/**
 * Module dependencies.
 */
export function index(req, res) {
    res.render('index', {
        user: req.user || null,
        request: req
    });
};
