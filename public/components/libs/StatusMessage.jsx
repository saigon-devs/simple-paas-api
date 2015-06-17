'use strict';

import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';

export default class StatusMessage extends React.Component {
    constructor(props) {
        super(props);
        this._getInitialState = this._getInitialState.bind(this);
        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {
            alertVisible: true
        };
    }

    handleAlertDismiss() {
        this.setState({alertVisible: false});
    }

    render() {
        if (this.state.alertVisible) {
            let status = 'primary';

            if (this.props.status == undefined || this.props.status === 0) {
                return (<div></div>);
            }

            if (this.props.status === 1) {
                status = 'success';
            } else if (this.props.status === 2) {
                status = 'info';
            } else if (this.props.status === 3) {
                status = 'warning';
            } else if (this.props.status === 3) {
                status = 'danger';
            }

            return (
                <div>
                    <Alert bsStyle={status} onDismiss={this.handleAlertDismiss} dismissAfter={5000}>
                        <strong>{this.props.message}</strong>
                    </Alert>
                </div>
            );
        }

        return (<div/>);
    }
}