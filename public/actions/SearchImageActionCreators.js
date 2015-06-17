'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import Constants from '../constants/AppConstants';
import ImageService from '../services/ImageService';

export default {
    searchImage: (term) => {
        let options = {
            term: term,
            doneCallback: (result) => {
                AppDispatcher.dispatch({
                    actionType: Constants.SEARCH_IMAGE,
                    images: result
                });
            }
        };
        ImageService.searchImage(options);
    }
};