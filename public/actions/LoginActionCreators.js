import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/AppConstants';
import RouterContainer from '../services/RouterContainer'
import UserService from '../services/UserService';
import utils from '../utils';

export default {
    loginByToken: (jwt) => {
        let savedJwt = localStorage.getItem('jwt');
        if (savedJwt !== jwt) {
            let nextPath = RouterContainer.get().getCurrentQuery().nextPath
                || utils.getSubDomainAliasUrl('/');

            RouterContainer.get().transitionTo(nextPath);
            localStorage.setItem('jwt', jwt);
        }

        AppDispatcher.dispatch({
            actionType: LOGIN_USER,
            jwt: jwt
        });
    },
    loginUser: (username, password) => {
        let options = {
            data: {
                username: username,
                password: password
            },
            doneCallback: (result) => {
                let jwt = result.id_token;
                let savedJwt = localStorage.getItem('jwt');

                if (savedJwt !== jwt) {
                    let nextPath = RouterContainer.get().getCurrentQuery().nextPath
                        || utils.getSubDomainAliasUrl('/');

                    RouterContainer.get().transitionTo(nextPath);
                    localStorage.setItem('jwt', jwt);
                }

                AppDispatcher.dispatch({
                    actionType: LOGIN_USER,
                    jwt: jwt
                });
            }
        };

        UserService.login(options);
    },
    logoutUser: () => {
        RouterContainer.get().transitionTo(utils.getSubDomainAliasUrl('/login'));
        localStorage.removeItem('jwt');
        AppDispatcher.dispatch({
            actionType: LOGOUT_USER
        });
    }
}