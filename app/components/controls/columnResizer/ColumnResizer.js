import React, { Component, PropTypes } from 'react'
import './ColumnResizer.css';


class ColumnResizer extends Component {
    render() {
        const { height } = this.props;
        return (
            <div className="vertical-line" style={{height}}>
            </div>
        );
    }
}

ColumnResizer.PropTypes = {
    height: PropTypes.number.isRequired
};

export {
    ColumnResizer
};
