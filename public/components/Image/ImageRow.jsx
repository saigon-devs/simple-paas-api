'use strict';

import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ModalTrigger from 'react-bootstrap/lib/ModalTrigger';
import LoadImageDetailModal from './LoadImageDetailModal.jsx';
import util from 'util';
import ImageStore from '../../stores/ImageStore';
import ImageActionCreator from '../../actions/ImageActionCreators';

export default class ImageRow extends React.Component {
    constructor(props) {
        super(props);

        this.handleViewClick = this.handleViewClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleViewClick(e) {

    }

    handleDeleteClick(e) {
        ImageActionCreator.deleteImage(this.props.id);
    }

    render() {
        return (
            <div>
                <tr>
                    <td>{this.props.repository}</td>
                    <td>{this.props.virtualSize}</td>
                    <td>{this.props.created}</td>
                    <td>
                        <ModalTrigger modal={<LoadImageDetailModal repository={this.props.repository} imageId={this.props.id} />}>
                            <Button bsStyle='default' className="btn-xs">View</Button>
                        </ModalTrigger>

                        <Button onClick={this.handleDeleteClick} bsStyle='danger' className="btn-xs">
                            Delete
                        </Button>
                    </td>
                </tr>
            </div>
        );
    }
}