'use strict';

import React from 'react';
import Loader from 'react-loader';
import ContainerRow from './ContainerRow.jsx';

export default class ContainerTable extends React.Component {
    render() {
        let containerNodes = this.props.containers.map(c => {
            return (
                <ContainerRow {...c} key={c.id}/>
            );
        });

        return (
            <div>
                <Loader loaded={this.props.loaded}>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>Command</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Status</th>
                                <th>Ports</th>
                                <th>&nbsp;</th>
                            </tr>
                            </thead>
                            <tbody>
                                {containerNodes}
                            </tbody>
                        </table>
                    </div>
                </Loader>
            </div>
        );
    }
}