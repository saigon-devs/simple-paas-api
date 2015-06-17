'use strict';

/* core components */
import React from 'react';
import $ from 'jquery';
import SearchImageActionCreator from '../../actions/SearchImageActionCreators';
import ImageActionCreator from '../../actions/ImageActionCreators';
import SearchImageStore from '../../stores/SearchImageStore';
/* ui components */
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Select from 'react-select';

export default class CreateImageModal extends React.Component {
    constructor(props) {
        super(props);

        this._getInitialState = this._getInitialState.bind(this);
        this.state = this._getInitialState();

        this.handleCreateImageClick = this.handleCreateImageClick.bind(this);
        this.getAsyncOptions = this.getAsyncOptions.bind(this);
    }

    _getInitialState() {
        return {
            images: []
        };
    }

    handleCreateImageClick(e) {
        let $imageNode, $imageValueNode, imageValue = '';
        $imageNode = $(this.refs.imageSelector.getDOMNode());
        $imageValueNode = $imageNode.find('input[type="hidden"]');
        if (!$imageValueNode) {
            alert('Please choose one image name !');
        } else {
            imageValue = $imageValueNode.val();
        }

        ImageActionCreator.createImage(imageValue);
    }

    getAsyncOptions(input, callback) {
        let rtn = {
            complete: true
        };

        input = input.toLowerCase();
        if (!input.length || input.length < 2) {
            rtn.complete = false;
            rtn.options = [];
        } else {
            SearchImageActionCreator.searchImage(input);
            rtn.options = SearchImageStore.state.images;
        }

        setTimeout(function () {
            callback(null, rtn);
        }, 50);
    }

    render() {
        return (
            <Modal {...this.props} title="Create Image" animation={false}>
                <div className="modal-body">
                    <form>
                        <fieldset>
                            <br/>

                            <div className="form-group">
                                <Select
                                    ref="imageSelector"
                                    name="image-selector"
                                    asyncOptions={this.getAsyncOptions}
                                    />
                                <span className="help-block">
                                    Image list above will query from Docker Hub...
                                </span>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div className='modal-footer'>
                    <Button onClick={this.props.onRequestHide}>Close</Button>
                    <Button onClick={this.handleCreateImageClick} bsStyle='primary'>Create</Button>
                </div>
            </Modal>
        );
    }
}