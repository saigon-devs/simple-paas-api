'use strict';

import React from 'react';

export default class MultipleRowColumn extends React.Component {
    render() {
        let cols = this.props.cols.map(c => {
            return (
                <div>{c}</div>
            );
        });

        return (
            <div>
                {cols}
            </div>
        );
    }
}