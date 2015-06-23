'use strict';

import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import AuthenticatedApp from './components/App';
import LoginPage from './components/User/Login.jsx';
import SettingPage from './components/Setting';
import HomePage from './components/Home';
import ImagePage from './components/Image';
import ServicePage from './components/Service';
import ContainerPage from './components/Container';
import AboutPage from './components/About';
import utils from './utils';

export default (
    <Route handler={AuthenticatedApp}>
        <DefaultRoute path={utils.getSubDomainAliasUrl('/')} handler={HomePage}/>
        <Route name="login" handler={LoginPage}/>
        <Route name="home" path={utils.getSubDomainAliasUrl('/home')} handler={HomePage}/>
        <Route name="setting" path={utils.getSubDomainAliasUrl('/setting')} handler={SettingPage}/>
        <Route name="container" path={utils.getSubDomainAliasUrl('/container')} handler={ContainerPage}/>
        <Route name="image" path={utils.getSubDomainAliasUrl('/image')} handler={ImagePage}/>
        <Route name="service" path={utils.getSubDomainAliasUrl('/service')} handler={ServicePage}/>
        <Route name="about" path={utils.getSubDomainAliasUrl('/about')} handler={AboutPage}/>
        <NotFoundRoute handler={HomePage}/>
    </Route>
);