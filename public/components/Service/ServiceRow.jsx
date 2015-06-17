'use strict';

import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class ServiceRow extends React.Component {
    constructor(props) {
        super(props);

        this.handleRunClick = this.handleRunClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    handleRunClick(e) {

    }

    handleDeleteClick(e) {

    }

    handleRefreshClick(e) {

    }

    render() {
        return (
            <div>
                <tr>
                    <td></td>
                    <td>{this.props.type}</td>
                    <td>
                        <i className="mdi-navigation-arrow-drop-down"></i>
                        <a href="#">{this.props.name}</a>
                    </td>
                    <td>{this.props.status}</td>
                    <td>{this.props.image}</td>
                    <td>{this.props.deployed}</td>
                    <td>
                        <Button onClick={this.handleRunClick} bsStyle='primary' className="btn-xs">
                            <i className="mdi-av-play-arrow"></i>
                        </Button>

                        <Button onClick={this.handleDeleteClick} bsStyle='danger' className="btn-xs">
                            <i className="mdi-action-delete"></i>
                        </Button>
                        <Button onClick={this.handleRefreshClick} bsStyle='success' className="btn-xs">
                            <i className="mdi-action-cached"></i>
                        </Button>
                    </td>
                </tr>
            </div>
        );
    }
}