'use strict';

import assign from 'object-assign';
import BaseService from './BaseService';

const API_CONTAINER_LIST_URL = '/api/containers';
const API_CONTAINER_STOP_URL = '/api/containers/stop/';
const API_CONTAINER_STOP_ALL_URL = '/api/containers/stop-all';
const API_CONTAINER_START_URL = '/api/containers/start/';

class ContainerService extends BaseService {
    constructor() {
        super();
    }

    getContainers(options) {
        let extOptions = assign({}, options, {
            url: this.serverUrl + API_CONTAINER_LIST_URL,
            type: 'GET'
        });
        this.executeRequest(extOptions);
    }

    stopContainers(options) {
        let extOptions = assign({}, options, {
            url: this.serverUrl + API_CONTAINER_STOP_ALL_URL,
            type: 'POST'
        });
        this.executeRequest(extOptions);
    }

    stopContainer(options) {
        let extOptions = assign({}, options, {
            url: this.serverUrl + API_CONTAINER_STOP_URL + (options.id || 0),
            type: 'POST'
        });
        this.executeRequest(extOptions);
    }

    startContainer(options) {
        let extOptions = assign({}, options, {
            url: this.serverUrl + API_CONTAINER_START_URL + (options.id || 0),
            type: 'POST'
        });
        this.executeRequest(extOptions);
    }
}

export default new ContainerService();