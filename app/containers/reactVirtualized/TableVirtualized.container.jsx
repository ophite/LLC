import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TablePage from '../../components/pages/reactVirtualized/TableVirtualized.page';
import GoldenLayoutContainer from '../goldenLayout/Golden.layout.container.jsx';
import { data, columns } from '../../components/pages/reactVirtualized/gridData';
import Immutable from 'immutable';
const list = Immutable.List(data);


class TableContainer extends GoldenLayoutContainer {

    render() {
        return (
            <TablePage
                {...this.props}
                list={list}
            />
        );
    }
}

TableContainer.propTypes = {
    uuid: React.PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        layoutPropsSize: state.layout.layoutPropsSize
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);



