'use strict';

import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import ActionCreator from '../../actions/ImageActionCreators';
import AuthenticatedComponent from '../libs/AuthenticatedComponent.jsx';
import Store from '../../stores/InspectedImageStore';
import Loader from 'react-loader';

export default AuthenticatedComponent(
    class LoadImageDetailModal extends React.Component {
        constructor(props){
            super(props);
            this.componentDidMount = this.componentDidMount.bind(this);
            this.componentWillUnmount = this.componentWillUnmount.bind(this);

            this._onChange = this._onChange.bind(this);
            this._getInitialState = this._getInitialState.bind(this);
            this.state = this._getInitialState();
        }

        _getInitialState(){
            return Store.state;
        }

        _onChange() {
            console.log(Store.state);
            this.setState(Store.state);
        }

        componentDidMount(){
            Store.addChangeListener(this._onChange);
            ActionCreator.queryImage(this.props.imageId);
        }

        componentWillUnmount() {
            Store.removeChangeListener(this._onChange);
        }

        render() {
            return (
                <div>
                    <Modal {...this.props} title='Image Information' animation={false}>
                        <div className='modal-body'>
                            <Loader loaded={this.state.loaded}>
                                <div>{this.props.repository}</div>
                                <div>{this.state.image.Architecture}</div>
                                <div>{this.state.image.VirtualSize}</div>
                            </Loader>
                        </div>
                        <div className='modal-footer'>
                            <Button onClick={this.props.onRequestHide}>Close</Button>
                        </div>
                    </Modal>
                </div>
            );
        }
    }
);