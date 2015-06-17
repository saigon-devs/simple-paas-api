import React from 'react/addons';
import ReactMixin from 'react-mixin';
import LoginAction from '../../actions/LoginActionCreators';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '',
            password: ''
        };
    }

    login(e) {
        e.preventDefault();
        LoginAction.loginUser(this.state.user, this.state.password);
    }

    render() {
        return (
            <div className="login">
                <h2><b>Login</b></h2>

                <form role="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" valueLink={this.linkState('user')}
                               className="form-control"
                               id="username" placeholder="Input username..."/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" valueLink={this.linkState('password')}
                               className="form-control"
                               id="password" ref="password" placeholder="Input password..."/>
                    </div>
                    <button type="submit" className="btn btn-primary"
                            onClick={this.login.bind(this)}>Go
                    </button>
                </form>
            </div>
        );
    }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);