'use strict';

import assign from 'object-assign';
import Constants from '../constants/AppConstants';
import BaseStore from './BaseStore';

class ServiceStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._services = [];
        this._loaded = false;
    }

    get state() {
        return {
            services: this._services,
            loaded: this._loaded
        };
    }

    _registerToActions(payload) {
        switch (payload.actionType) {
            case Constants.GET_SERVICES:
                this._services = payload.services;
                this._loaded = true;
                break;
        }
        this.emitChange();
    }
}

export default new ServiceStore();