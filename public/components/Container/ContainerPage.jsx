'use strict';

/* Core components */
import React from 'react';
import Store from '../../stores/ContainerStore';
import ActionCreator from '../../actions/ContainerActionCreators';
import util from 'util';
import AuthenticatedComponent from '../libs/AuthenticatedComponent.jsx';
/* UI components */
import Button from 'react-bootstrap/lib/Button';
import ContainerTable from './ContainerTable.jsx';
import StatusMessage from '../libs/StatusMessage.jsx';

export default AuthenticatedComponent(
    class ContainerPage extends React.Component {
        constructor(props) {
            super(props);

            /* binding in component levels */
            this.componentDidMount = this.componentDidMount.bind(this);
            this.componentWillUnmount = this.componentWillUnmount.bind(this);

            this._onChange = this._onChange.bind(this);
            this._getInitialState = this._getInitialState.bind(this);
            this.state = this._getInitialState();

            /* binding events */
            this.handleClick = this.handleClick.bind(this);
        }

        _getInitialState() {
            return Store.state;
        }

        _onChange() {
            this.setState(Store.state);
        }

        componentDidMount() {
            Store.addChangeListener(this._onChange);
            ActionCreator.getContainers();
        }

        componentWillUnmount() {
            Store.removeChangeListener(this._onChange);
        }

        handleClick() {
            if (confirm('Are you sure!!!')) {
                ActionCreator.stopAllContainerHandle();
            }
        }

        render() {
            let statusMessageNode = (
                <div/>
            );

            if (this.state.statusMessage) {
                statusMessageNode = (
                    <div>
                        <StatusMessage
                            status={this.state.statusMessage.status}
                            message={this.state.statusMessage.message}/>
                    </div>
                );
            }

            let headerInfoNode = (
                <div>
                    <div className="page-header" id="header-info">
                        <h1>
                            <b>Container Management</b>
                        </h1>

                        <div className="header-info-toolbar">
                            <Button onClick={this.handleClick} bsStyle='danger' className='pull-right'>Stop
                                Containers</Button>
                        </div>
                    </div>
                </div>
            );

            return (
                <div>
                    {statusMessageNode}
                    {headerInfoNode}
                    <div className="container container-fixed">
                        <div className="row">
                            <ContainerTable
                                containers={this.state.containers}
                                loaded={this.state.loaded}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
);