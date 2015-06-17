'use strict';

import path from 'path';

export default function (app) {
    let core = require('../../app/controllers/user.server.controller');
    app.route('/users').post(core.users);
    app.route('/sessions/create').post(core.sessionCreate);
};