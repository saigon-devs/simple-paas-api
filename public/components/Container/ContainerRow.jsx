'use strict';

import React from 'react';
import ActionCreator from '../../actions/ContainerActionCreators';
import MultipleRowColumn from '../libs/MultipleRowColumn.jsx';
import Store from '../../stores/ContainerStore';
import util from 'util';

export default class ContainerRow extends React.Component {
    constructor(props) {
        super(props);

        this._getInitialState = this._getInitialState.bind(this);
        this.state = this._getInitialState();

        this.handleClick = this.handleClick.bind(this);
    }

    _getInitialState() {
        return Store.getStateById(this.props.id);
    }

    handleClick(e) {
        let run = this.state.container.isRunning;
        if (run == 1) {
            ActionCreator.stopContainerHandle(this.props.id);
            this.state.container.isRunning = 0;
        } else {
            ActionCreator.startContainerHandle(this.props.id);
            this.state.container.isRunning = 1;
        }
    }

    static formatPorts(ports) {
        if (ports && ports.length > 0) {
            return util.format(
                '%s:%s->%s:%s',
                ports[0]['IP'],
                ports[0]['PrivatePort'],
                ports[0]['PublicPort'],
                ports[0]['Type']);
        }
        return '';
    }

    render() {
        let started = 'primary', statusButtonClass;
        if (this.state.container.isRunning) {
            started = "danger";
        }
        statusButtonClass = util.format("btn btn-%s btn-xs", started);

        return (
            <div>
                <tr>
                    <td>{this.state.container.command}</td>
                    <td>
                        <MultipleRowColumn cols={this.state.container.name}/>
                    </td>
                    <td>{this.state.container.image}</td>
                    <td>{this.state.container.status}</td>
                    <td>{ContainerRow.formatPorts(this.state.container.ports)}</td>
                    <td>
                        <a onClick={this.handleClick} href="#" className={statusButtonClass}>
                            {this.state.container.isRunning === 1 ? 'Stop' : 'Start'}
                        </a>
                    </td>
                </tr>
            </div>
        );
    }
}