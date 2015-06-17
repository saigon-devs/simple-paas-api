'use strict';

import assign from 'object-assign';
import Constants from '../constants/AppConstants';
import BaseStore from './BaseStore';

class ImageStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._images = [];
        this._loaded = false;
        this._statusMessage = {
            status: 0,
            message: ''
        };
    }

    get state() {
        return {
            images: this._images,
            loaded: this._loaded,
            statusMessage: this._statusMessage
        };
    }

    _registerToActions(payload) {
        switch (payload.actionType) {
            case Constants.GET_IMAGES:
                this._images = payload.images;
                this._loaded = true;
                break;
            case Constants.CREATE_IMAGE:
                break;
            case Constants.DELETE_IMAGE:
                let index = 0;
                for (let image of this._images) {
                    if (image.id === payload.imageId) {
                        this._images.splice(index, 1);
                        break;
                    }
                    index++;
                }
                break;
        }
        this.emitChange();
    }
}

export default new ImageStore();