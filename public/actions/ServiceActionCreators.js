'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import Constants from '../constants/AppConstants';
import ServiceService from '../services/ServiceService';

export default {
    getServices: () => {
        let options = {
            doneCallback: (result) => {
                AppDispatcher.dispatch({
                    actionType: Constants.GET_SERVICES,
                    services: result
                });
            }
        };
        ServiceService.getServices(options);
    }
};