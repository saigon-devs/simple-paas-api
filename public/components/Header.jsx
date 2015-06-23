'use strict';

import React from 'react';
import Router from 'react-router';
import LoginStore from '../stores/LoginStore';
import LoginAction from '../actions/LoginActionCreators';

var Link = Router.Link;

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        /* initial state */
        this._onChange = this._onChange.bind(this);
        this._getInitialState = this._getInitialState.bind(this);
        this.state = this._getInitialState();

        /* binding in component levels */
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

        /* handle events */
        this.handleClick = this.handleClick.bind(this);
        this.logoutHandle = this.logoutHandle.bind(this);
    }

    _getInitialState() {
        return {
            collapsed: true,
            userLoggedIn: LoginStore.isLoggedIn()
        };
    }

    _onChange() {
        this.setState({
            collapsed: true,
            userLoggedIn: LoginStore.isLoggedIn()
        });
    }

    componentDidMount() {
        LoginStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(this._onChange);
    }

    handleClick(e) {
        var collapsed = this.state.collapsed;
        this.setState({collapsed: !collapsed});
    }

    logoutHandle(e) {
        e.preventDefault();
        LoginAction.logoutUser();
    }

    render() {
        let collapsedMenuClassName = "collapse navbar-collapse navbar-inverse-collapse"
            + (this.state.collapsed === true ? "" : " in");

        let topMenu = '', profileMenu = '';
        if (this.state.userLoggedIn) { // log in already
            topMenu = (
                <div>
                    <ul className="nav navbar-nav">
                        <li><Link className="" to="service">Services</Link></li>
                    </ul>
                    <ul className="nav navbar-nav">
                        <li><Link className="" to="image">Images</Link></li>
                    </ul>
                    <ul className="nav navbar-nav">
                        <li><Link className="" to="container">Containers</Link></li>
                    </ul>
                    <ul className="nav navbar-nav">
                        <li><Link className="" to="about">About</Link></li>
                    </ul>
                </div>
            );
            profileMenu = (
                <div>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="bootstrap-elements.html" data-target="#" className="dropdown-toggle"
                                data-toggle="dropdown">{LoginStore.user.userName} <b className="caret"></b></a>
                            <ul className="dropdown-menu">
                                <li><Link className="" to="setting">Settings</Link></li>
                                <li><a href="" onClick={this.logoutHandle}>Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            );
        }

        return (
            <div>
                <div className="navbar navbar-fixed-top navbar-default">
                    <div className="navbar-header">
                        <button type="button" onClick={this.handleClick} className="navbar-toggle"
                                data-toggle="collapse" data-target=".navbar-inverse-collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="home">
                            <b>{this.props.title}</b>
                        </Link>
                    </div>

                    <div id="top-menu" className={collapsedMenuClassName}>
                        {topMenu}
                        {profileMenu}
                    </div>
                </div>
            </div>
        );
    }
}