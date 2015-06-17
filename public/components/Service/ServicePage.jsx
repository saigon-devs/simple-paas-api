'use strict';

/* core components */
import React from 'react';
import ServiceStore from '../../stores/ServiceStore';
import ServiceActionCreator from '../../actions/ServiceActionCreators';
import AuthenticatedComponent from '../libs/AuthenticatedComponent.jsx';
/* ui components */
import ServiceTable from './ServiceTable.jsx';
import Button from 'react-bootstrap/lib/Button';

export default AuthenticatedComponent(
    class ServicePage extends React.Component {
        constructor(props) {
            super(props);

            /* binding in component levels */
            this.componentDidMount = this.componentDidMount.bind(this);
            this.componentWillUnmount = this.componentWillUnmount.bind(this);

            this._onChange = this._onChange.bind(this);
            this._getInitialState = this._getInitialState.bind(this);
            this.state = this._getInitialState();
        }

        _getInitialState() {
            return ServiceStore.state;
        }

        _onChange() {
            this.setState(ServiceStore.state);
        }

        componentDidMount() {
            ServiceStore.addChangeListener(this._onChange);
            ServiceActionCreator.getServices();
        }

        componentWillUnmount() {
            ServiceStore.removeChangeListener(this._onChange);
        }

        render() {
            let headerInfoNode = (
                <div>
                    <div className="page-header" id="header-info">
                        <h1>
                            <b>Service Management</b>
                        </h1>

                        <div className="header-info-toolbar">
                            <Button bsStyle='primary' className='pull-right'>
                                Create Service
                            </Button>
                        </div>
                    </div>
                </div>
            );

            return (
                <div>
                    {headerInfoNode}
                    <div className="container container-fixed">
                        <div className="row">
                            <ServiceTable
                                services={this.state.services}
                                loaded={this.state.loaded}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
);