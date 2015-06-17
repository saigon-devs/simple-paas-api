'use strict';

import assign from 'object-assign';
import BaseService from './BaseService';

const API_LOGIN_URL = '/sessions/create';

class UserService extends BaseService {
    constructor() {
        super();
    }

    login(options) {
        let extOptions = assign({}, options, {
            url: this.serverUrl + API_LOGIN_URL,
            type: 'POST'
        });
        this.executeRequest(extOptions);
    }
}

export default new UserService();