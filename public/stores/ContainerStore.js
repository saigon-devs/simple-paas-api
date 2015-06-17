'use strict';

import assign from 'object-assign';
import Constants from '../constants/AppConstants';
import BaseStore from './BaseStore';

class ContainerStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._containers = [];
        this._loaded = false;
        this._statusMessage = {
            status: 0,
            message: ''
        };
    }

    get state() {
        return {
            containers: this._containers,
            loaded: this._loaded,
            statusMessage: this._statusMessage
        };
    }

    getStateById(id) {
        if (id) {
            for (let container of this._containers) {
                if (container.id === id) {
                    return {container};
                }
            }
        }
        return null;
    }

    _registerToActions(payload) {
        switch (payload.actionType) {
            case Constants.GET_CONTAINERS:
                this._containers = payload.containers;
                this._loaded = true;
                break;
            case Constants.STOP_ALL_CONTAINERS:
                for (let c of this._containers) {
                    c.isRunning = 0;
                }
                this._statusMessage.status = 1;
                this._statusMessage.message = payload.message;
                break;
            case Constants.STOP_CONTAINER:
                for (let c of this._containers) {
                    if (c.id === payload.id) {
                        c.isRunning = 0;
                    }
                }
                this._statusMessage.status = payload.status;
                this._statusMessage.message = payload.message;
                break;
            case Constants.START_CONTAINER:
                for (let c of this._containers) {
                    if (c.id === payload.id) {
                        c.isRunning = 1;
                    }
                }
                this._statusMessage.status = payload.status;
                this._statusMessage.message = payload.message;
                break;
        }
        this.emitChange();
    }
}

export default new ContainerStore();