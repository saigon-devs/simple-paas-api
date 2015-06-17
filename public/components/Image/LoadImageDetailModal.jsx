'use strict';

import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

export default class LoadImageDetailModal extends React.Component {
    render() {
        return (
            <div>
                <Modal {...this.props} title='Image Information' animation={false}>
                    <div className='modal-body'>

                    </div>
                    <div className='modal-footer'>
                        <Button onClick={this.props.onRequestHide}>Close</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}