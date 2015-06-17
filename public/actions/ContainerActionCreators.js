'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import Constants from '../constants/AppConstants';
import ContainerService from '../services/ContainerService';

export default {
    getContainers: () => {
        let options = {
            doneCallback: (result) => {
                AppDispatcher.dispatch({
                    actionType: Constants.GET_CONTAINERS,
                    containers: result
                });
            }
        };
        ContainerService.getContainers(options);
    },
    stopAllContainerHandle: () => {
        let options = {
            doneCallback: (result) => {
                AppDispatcher.dispatch({
                    actionType: Constants.STOP_ALL_CONTAINERS,
                    containers: result
                });
            }
        };
        ContainerService.stopContainers(options);
    },
    stopContainerHandle: (id) => {
        let options = {
            id: id,
            doneCallback: (result) => {
                AppDispatcher.dispatch({
                    actionType: Constants.STOP_CONTAINER,
                    id: id,
                    message: result,
                    status: 1
                });
            },
            failCallback: (result) => {
                AppDispatcher.dispatch({
                    actionType: Constants.STOP_CONTAINER,
                    id: id,
                    message: result,
                    status: 1
                });
            }
        };
        ContainerService.stopContainer(options);
    },
    startContainerHandle: (id) => {
        let options = {
            id: id,
            doneCallback: (result) => {
                AppDispatcher.dispatch({
                    actionType: Constants.START_CONTAINER,
                    id: id,
                    message: result,
                    status: 1
                });
            },
            failCallback: (result) => {
                AppDispatcher.dispatch({
                    actionType: Constants.START_CONTAINER,
                    id: id,
                    message: result,
                    status: 1
                });
            }
        };
        ContainerService.startContainer(options);
    }
};