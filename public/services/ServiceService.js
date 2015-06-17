'use strict';

import assign from 'object-assign';
import BaseService from './BaseService';

const API_SERVICE_URL = '/api/services/';

class ServiceService extends BaseService {
    constructor() {
        super();
    }

    getServices(options) {
        let extOptions = assign({}, options, {
            url: this.serverUrl + API_SERVICE_URL,
            type: 'GET'
        });
        this.executeRequest(extOptions);
    }
}

export default new ServiceService();