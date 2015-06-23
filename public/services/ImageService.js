'use strict';

import assign from 'object-assign';
import BaseService from './BaseService';

const API_IMAGE_URL = '/api/images/';
const API_CREATE_IMAGE_URL = '/api/images';
const API_DELETE_IMAGE_URL = '/api/images/';
const API_SEARCH_IMAGE_URL = '/api/images/search/';

class ImageService extends BaseService {
    constructor() {
        super();
    }

    getImages(options) {
        let extOptions = assign({}, options, {
            url: this.serverUrl + API_IMAGE_URL,
            type: 'GET'
        });
        this.executeRequest(extOptions);
    }

    createImage(options) {
        let extOptions = assign({}, options, {
            url: this.serverUrl + API_CREATE_IMAGE_URL,
            data: {
                fromImage: options.imageName
            },
            type: 'POST'
        });
        this.executeRequest(extOptions);
    }

    deleteImage(options) {
        let extOptions = assign({}, options, {
            url: this.serverUrl + API_DELETE_IMAGE_URL + options.id,
            type: 'DELETE'
        });
        this.executeRequest(extOptions);
    }

    searchImage(options) {
        let extOptions = assign({}, options, {
            url: this.serverUrl + API_SEARCH_IMAGE_URL + options.term,
            type: 'GET'
        });
        this.executeRequest(extOptions);
    }

    queryImage(options){
        let extOptions = assign({}, options, {
            url: this.serverUrl + API_IMAGE_URL + options.id,
            type: 'GET'
        });
        this.executeRequest(extOptions);
    }
}

export default new ImageService();