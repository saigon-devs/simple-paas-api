'use strict';

import React from 'react';
import Router from 'react-router';
import routes from './routes.jsx';
import RouterContainer from './services/RouterContainer';
import ImageActionCreator from './actions/ImageActionCreators';
import ContainerActionCreator from './actions/ContainerActionCreators';
import LoginActionCreator from './actions/LoginActionCreators';

function bootstrap() {
    let router, jwt;
    router = Router.run(routes, Router.HistoryLocation, function (Handler, state) {
        if (window.__DATA__) {
            state = window.__DATA__;
            window.__DATA__ = null;//only use at first render to sync up
        }

        React.render(<Handler {...state}/>, document.querySelector('#main'));
    });
    RouterContainer.set(router);
    jwt = localStorage.getItem('jwt');
    if (jwt) {
        LoginActionCreator.loginByToken(jwt);
    } else {
        RouterContainer.get().transitionTo('/login');
    }
}

Promise.all([
    new Promise((resolve) => {
        if (window.addEventListener) {
            window.addEventListener('DOMContentLoaded', resolve);
        } else {
            window.attachEvent('onload', resolve);
        }
    })
]).then(bootstrap);