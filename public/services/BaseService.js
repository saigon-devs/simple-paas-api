'use strict';

import $ from 'jquery';
import config from '../config';
import assign from 'object-assign';

export default class BaseService {
    constructor() {
        this._options = config.defaultAjaxOptions;
    }

    get serverUrl() {
        return config.serverUrl;
    }

    executeRequest(options) {
        this.extendAjaxOptions(options);
        this.ajaxRequest();
    }

    extendAjaxOptions(options) {
        this._options = assign({}, config.defaultAjaxOptions, options);
    }

    ajaxRequest() {
        $.ajax(this._options)
            .done((result, textStatus, jqXHR) => {
                if (this._options.doneCallback) {
                    this._options.doneCallback(result, textStatus, jqXHR);
                }
            })
            .fail((jqXHR, textStatus) => {
                if (this._options.failCallback) {
                    this._options.failCallback(textStatus, jqXHR);
                }
            });
    }
}