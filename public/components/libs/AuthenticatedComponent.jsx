'use strict';

import React from 'react';
import LoginStore from '../../stores/LoginStore';

export default (ComposedComponent) => {
    return class AuthenticatedComponent extends React.Component {

        static willTransitionTo(transition) {
            if (!LoginStore.isLoggedIn()) {
                transition.redirect('/login', {}, {'nextPath': transition.path});
            }
        }

        constructor() {
            super();

            /* binding in component levels */
            this.componentDidMount = this.componentDidMount.bind(this);
            this.componentWillUnmount = this.componentWillUnmount.bind(this);

            this._onChange = this._onChange.bind(this);
            this._getLoginState = this._getLoginState.bind(this);
            this.state = this._getLoginState();
        }

        _getLoginState() {
            return {
                userLoggedIn: LoginStore.isLoggedIn(),
                user: LoginStore.user,
                jwt: LoginStore.jwt
            };
        }

        _onChange() {
            this.setState(this._getLoginState());
        }

        componentDidMount() {
            this.changeListener = this._onChange.bind(this);
            LoginStore.addChangeListener(this.changeListener);
        }

        componentWillUnmount() {
            LoginStore.removeChangeListener(this.changeListener);
        }

        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    user={this.state.user}
                    jwt={this.state.jwt}
                    userLoggedIn={this.state.userLoggedIn}/>
            );
        }
    }
};