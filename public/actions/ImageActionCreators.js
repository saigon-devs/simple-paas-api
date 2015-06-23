'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import Constants from '../constants/AppConstants';
import ImageService from '../services/ImageService';

export default {
    getImages: () => {
        let options = {
            doneCallback: (result) => {
                AppDispatcher.dispatch({
                    actionType: Constants.GET_IMAGES,
                    images: result
                });
            }
        };
        ImageService.getImages(options);
    },
    createImage: (imageName) => {
        let options = {
            imageName: imageName,
            doneCallback: (result) => {
                AppDispatcher.dispatch({
                    actionType: Constants.CREATE_IMAGE,
                    result: result
                });
            }
        };
        ImageService.createImage(options);
    },
    deleteImage: (imageId) => {
        let options = {
            id: imageId,
            doneCallback: (result) => {
                AppDispatcher.dispatch({
                    actionType: Constants.DELETE_IMAGE,
                    imageId: imageId
                });
            }
        };
        ImageService.deleteImage(options);
    },
    queryImage:(imageId)=>{
        let option = {
            id: imageId,
            doneCallback:(result)=>{
                AppDispatcher.dispatch({
                    actionType: Constants.QUERY_IMAGE,
                    image: result
                });
            }
        };
        ImageService.queryImage(option);
    },
};