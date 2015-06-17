'use strict';

/* core components */
import React from 'react';
import $ from 'jquery';
/* ui components */
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

export default class BuildImageModal extends React.Component {
    constructor(props) {
        super(props);

        // init data
        this.state = this._getInitialState();
        // bind events
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    _getInitialState() {
        return {};
    }

    handleSubmit() {
        $(this.refs.uploader).ajaxSubmit({
            error: function (xhr) {
                console.log(xhr.status);
            },
            success: function (response) {
                console.log(response);
            }
        });
        return false;
    }

    render() {
        return (
            <Modal {...this.props} title='Build Image From a Dockerfile' animation={false}>
                <form onSubmit={this.handleSubmit} id="uploader" ref="uploader" method="post"
                      encType="multipart/form-data" action="/api/images/upload">
                    <div className='modal-body'>
                        <input type="file" name="file"/>
                    </div>
                    <div className='modal-footer'>
                        <Button onClick={this.props.onRequestHide}>Close</Button>
                        <Button bsStyle='primary' type="submit">Build</Button>
                    </div>
                </form>
            </Modal>
        );
    }
}