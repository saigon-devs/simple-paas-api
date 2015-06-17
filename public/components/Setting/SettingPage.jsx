'use strict';

import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import ModalTrigger from 'react-bootstrap/lib/ModalTrigger';
import SettingList from './SettingList.jsx';

export default class SettingPage extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <h3 className="pull-left">Settings</h3>
                    <ModalTrigger modal={<CreateSettingModal />}>
                        <Button bsStyle='primary' className='pull-right'>Create</Button>
                    </ModalTrigger>
                </div>
                <SettingList />
            </div>
        );
    }
}

export class CreateSettingModal extends React.Component {
    render() {
        return (
            <Modal {...this.props} title='Creating Settings' animation={false}>
                <div className='modal-body'>
                    <form>
                        <fieldset>
                            <br/>

                            <div className="form-group">
                                <input className="form-control floating-label" type="text"
                                       placeholder="Input your IP..."/>
                            </div>

                            <div className="form-group">
                                <input className="form-control floating-label" type="text"
                                       placeholder="Input your port..."/>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div className='modal-footer'>
                    <Button onClick={this.props.onRequestHide}>Close</Button>
                    <Button bsStyle='primary'>Save</Button>
                </div>
            </Modal>
        );
    }
}