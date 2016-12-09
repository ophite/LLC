import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TablePage from '../../components/pages/reactVirtualized/TableVirtualized.page.jsx';
import GoldenContainer from '../goldenLayout/GoldenLayout.container.jsx';


class TableContainer extends GoldenContainer {

    render() {
        return (
            <TablePage
                {...this.props}
                uuid={this.stateProps ? this.stateProps.uuid : null}
            />
        );
    }
}

TableContainer.propTypes = {};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);



