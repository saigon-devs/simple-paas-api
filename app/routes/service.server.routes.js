'use strict';

import path from 'path';
import ServiceCntrl from '../../app/controllers/service.server.controller';

export default function (app) {
    // Root routing
    let serviceCntrl = new ServiceCntrl();
    app.route('/api/services').get(serviceCntrl.servicesAction);
    app.route('/api/docker/version').get(serviceCntrl.getDockerVersion);
    app.route('/api/docker/systemwideinfo').get(serviceCntrl.getSystemWideInfo);
};