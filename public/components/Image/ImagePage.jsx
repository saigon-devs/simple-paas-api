'use strict';

/* core components */
import React from 'react';
import Store from '../../stores/ImageStore';
import ActionCreator from '../../actions/ImageActionCreators';
import AuthenticatedComponent from '../libs/AuthenticatedComponent.jsx';
/* ui components */
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ModalTrigger from 'react-bootstrap/lib/ModalTrigger';
import ImageTable from './ImageTable.jsx';
import CreateImageModal from './CreateImageModal.jsx';
import BuildImageModal from './BuildImageModal.jsx';

export default AuthenticatedComponent(
    class ImagePage extends React.Component {
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
            return Store.state;
        }

        _onChange() {
            this.setState(Store.state);
        }

        componentDidMount() {
            Store.addChangeListener(this._onChange);
            ActionCreator.getImages();
        }

        componentWillUnmount() {
            Store.removeChangeListener(this._onChange);
        }

        render() {
            let headerInfoNode = (
                <div>
                    <div className="page-header" id="header-info">
                        <h1>
                            <b>Image Management</b>
                        </h1>

                        <div className="header-info-toolbar">
                            <ModalTrigger modal={<BuildImageModal />}>
                                <Button bsStyle='primary' className='pull-right'>Build</Button>
                            </ModalTrigger>
                            <ModalTrigger modal={<CreateImageModal />}>
                                <Button bsStyle='default' className='pull-right'>Create</Button>
                            </ModalTrigger>
                        </div>
                    </div>
                </div>
            );

            return (
                <div>
                    {headerInfoNode}
                    <div className="container container-fixed">
                        <div className="row">
                            <ImageTable
                                images={this.state.images}
                                loaded={this.state.loaded}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
);

