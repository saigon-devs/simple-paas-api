'use strict';

import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Input from 'react-bootstrap/lib/Input';
import util from 'util';

class SettingRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = this._getInitialState();
        this._getInitialState = this._getInitialState.bind(this);

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    _getInitialState() {
        return {
            active: false
        };
    }

    handleChange() {
        this.setState({
            active: this.refs.input.getValue()
        });
    }

    handleEditClick(e) {
        alert('edit');
    }

    handleDeleteClick(e) {
        alert('delete');
    }

    render() {
        return (
            <div>
                <tr>
                    <td>
                        {this.props.id}
                    </td>
                    <td>
                        <Input
                            type='radio'
                            name='activeRdo'
                            groupClassName=''
                            readOnly />
                    </td>
                    <td>{this.props.ip}</td>
                    <td>{this.props.port}</td>
                    <td>
                        <Button onClick={this.handleEditClick} bsStyle='default' className='btn-xs'>Edit</Button>
                        <Button onClick={this.handleDeleteClick} bsStyle='danger' className='btn-xs'>Delete</Button>
                    </td>
                </tr>
            </div>
        );
    }
}

class SettingTable extends React.Component {
    render() {
        let settingsNodes = this.props.settings.map(c => {
            return (
                <SettingRow {...c} key={c.id}/>
            );
        });

        return (
            <div>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>Active</th>
                            <th>IP</th>
                            <th>Port</th>
                            <th>&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        {settingsNodes}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default class SettingList extends React.Component {
    constructor(props) {
        super(props);

        this._getInitialState = this._getInitialState.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);

        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {
            settings: []
        };
    }

    _hasSettingData() {
        return this.state.settings &&
            this.state.settings.length > 0;
    }

    componentWillMount() {
        if (!this._hasSettingData()) {
            //todo: will call ajax here
            this.setState({
                settings: [
                    {
                        id: 1,
                        ip: '127.0.0.1',
                        port: '80'
                    },
                    {
                        id: 2,
                        ip: '127.0.0.1',
                        port: '8080'
                    }
                ]
            });
        }
    }

    render() {
        if (this._hasSettingData()) {
            return (
                <div>
                    <div className="table-responsive">
                        <SettingTable settings={this.state.settings}/>
                    </div>
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
}