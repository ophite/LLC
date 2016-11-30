import React, { Component, PropTypes } from 'react'
import { data, columns } from './gridData'
import GoldenComponentPage from '../golden/GoldenComponent.page.jsx';
import Table from './demo/Table.example';
import Immutable from 'immutable'

const list = Immutable.List(data);


class TablePage extends GoldenComponentPage {

    constructor(props, context) {
        super(props, context);
        this.state = {
            groupingColumns: [
                'country',
                'grade',
            ],
            dataSource: data,
        };
    }

    render() {
        return (
            <div ref={(ref) => this.goldenWindow = ref}>
                <Table
                    list={list}
                />
            </div>
        );
    }
}

export default TablePage;
