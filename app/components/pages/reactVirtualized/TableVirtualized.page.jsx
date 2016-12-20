import React, { Component, PropTypes } from 'react'
import { data, columns } from './gridData'
import GoldenLayoutPage from '../goldenLayout/Golden.layout.page.jsx';
import Table from './Table.example';
import Immutable from 'immutable'

const list = Immutable.List(data);


class TableVirtualizedPage extends GoldenLayoutPage {

    render() {
        return (
            <div ref={(ref) => this.goldenWindow = ref}>
                <Table
                    {...this.props}
                    list={list}
                />
            </div>
        );
    }
}

export default TableVirtualizedPage;
