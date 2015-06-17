'use strict';

import assign from 'object-assign';
import Constants from '../constants/AppConstants';
import BaseStore from './BaseStore';

class SearchImageStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._images = [];
        this._loaded = false;
    }

    get state() {
        return {
            images: this._images,
            loaded: this._loaded
        };
    }

    _registerToActions(payload) {
        switch (payload.actionType) {
            case Constants.SEARCH_IMAGE:
                this._images = [];
                for (let image of payload.images) {
                    this._images.push({
                        value: image.name,
                        label: image.name
                    });
                }
                this._loaded = true;
                break;
        }
        this.emitChange();
    }
}

export default new SearchImageStore();