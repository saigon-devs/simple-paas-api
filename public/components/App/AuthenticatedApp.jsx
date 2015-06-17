'use strict';

import React from 'react';
import Router from 'react-router';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import $ from 'jquery';

var RouteHandler = Router.RouteHandler;

export default class AuthenticatedApp extends React.Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        // $.material.init();
    }

    render() {
        return (
            <div>
                <Header title="SIMPLE PAAS" />

                <div>
                    <div className="flyin-widget">
                        <RouteHandler {...this.props} />
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}