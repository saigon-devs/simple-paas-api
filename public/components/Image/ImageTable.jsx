'use strict';

import React from 'react';
import Loader from 'react-loader';
import ImageRow from './ImageRow.jsx';

export default class ImageTable extends React.Component {
    render() {
        let actionColumnStyle = {
            width: "20%"
        };
        let imageNodes = this.props.images.map(image => {
            return (
                <ImageRow {...image} key={image.id}/>
            );
        });

        return (
            <div>
                <Loader loaded={this.props.loaded}>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>Repo Tags</th>
                                <th>Virtual Size</th>
                                <th>Created</th>
                                <th style={actionColumnStyle}>&nbsp;</th>
                            </tr>
                            </thead>
                            <tbody>
                            {imageNodes}
                            </tbody>
                        </table>
                    </div>
                </Loader>
            </div>
        );
    }
}