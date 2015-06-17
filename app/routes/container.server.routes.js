'use strict';

import path from 'path';

export default function (app) {
    // Root routing
    let containerCntrl = require('../../app/controllers/container.server.controller');
    app.route('/api/containers').get(containerCntrl.containersAction);
    app.route('/api/containers/stop/:id').post(containerCntrl.stopContainer);
    app.route('/api/containers/stop-all').post(containerCntrl.stopAllContainers);
    app.route('/api/containers/start/:id').post(containerCntrl.startContainer);
    app.route('/api/containers/create').post(containerCntrl.createContainer);
};