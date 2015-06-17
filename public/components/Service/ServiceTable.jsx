'use strict';

import React from 'react';
import Loader from 'react-loader';
import ServiceRow from './ServiceRow.jsx';

export default class ServiceTable extends React.Component {
    render() {
        let actionColumnStyle = {
            width: "25%"
        };
        let serviceNodes = this.props.services.map(service => {
            return (
                <ServiceRow {...service} key={service.id}/>
            );
        });

        return (
            <div>
                <Loader loaded={this.props.loaded}>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Image</th>
                                <th>Deployed</th>
                                <th style={actionColumnStyle}>&nbsp;</th>
                            </tr>
                            </thead>
                            <tbody>
                            {serviceNodes}
                            </tbody>
                        </table>
                    </div>
                </Loader>
            </div>
        );
    }
}