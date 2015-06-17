'use strict';

import {LOGIN_USER, LOGOUT_USER} from '../constants/AppConstants';
import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';

class LoginStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._user = null;
        this._jwt = null;

        if(typeof window != "undefined" && window.localStorage && window.localStorage.jwt) {
            this._jwt = window.localStorage.jwt;
            this._user = jwt_decode(window.localStorage.jwt);
        }
    }

    _registerToActions(payload) {
        switch (payload.actionType) {
            case LOGIN_USER:
                this._jwt = payload.jwt;
                this._user = jwt_decode(this._jwt);
                break;
            case LOGOUT_USER:
                this._user = null;
                break;
            default:
                break;
        }
        this.emitChange();
    }

    get user() {
        return this._user;
    }

    get jwt() {
        return this._jwt;
    }

    isLoggedIn() {
        return !!this._user;
    }
}

export default new LoginStore();