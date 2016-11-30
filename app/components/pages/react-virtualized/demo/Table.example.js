import React, { Component, PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import {
    Table,
    Column,
    defaultRowRenderer,
    defaultHeaderRenderer
} from 'react-virtualized/source/Table'
import {
    AutoSizer,
} from 'react-virtualized/source/AutoSizer'
import Immutable from 'immutable'

import SortDirection from './SortDirection'
import SortIndicator from './SortIndicator'

import './styles.css';
import styles from './Table.example.css'
import { GroupingColumnsBox } from '../../react-datagrid/GroupingColumnsBox/GroupingColumnsBox.jsx';



class TableExample extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            groupingColumns: [
                'firstName',
                'index',
            ],
            list: props.list,
            headerHeight: 30,
            height: 500,
            overscanRowCount: 10,
            rowHeight: 40,
            rowCount: 1000,
            sortBy: 'index',
            sortDirection: SortDirection.ASC,
            useDynamicRowHeight: false
        };
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return shallowCompare(this, nextProps, nextState);
    };

    _getDatum = (list, index) => {
        const item = list.get(index % list.size);
        return item;
    };

    _getRowHeight = (params) => {
        const { index } = params;
        const { list } = this.props;
        return this._getDatum(list, index).size
    };

    _isSortEnabled = () => {
        const { list } = this.props;
        const { rowCount } = this.state;
        return rowCount <= list.size
    };

    _noRowsRenderer = () => {
        return (
            <div className={styles.noRows}>
                No rows
            </div>
        );
    };

    _rowClassName = (params) => {
        const { index } = params;
        if (index < 0) {
            return styles.headerRow
        } else {
            return index % 2 === 0 ? styles.evenRow : styles.oddRow
        }
    };

    _sort = (params) => {
        const { sortBy, sortDirection } = params;
        this.setState({ sortBy, sortDirection });
    };

    _headerRenderer = (params) => {
        const {
            columnData,
            dataKey,
            disableSort,
            label,
            sortBy,
            sortDirection
        } = params;
        return (
            <div>
                Full Name1
                {
                    sortBy === dataKey &&
                    <SortIndicator sortDirection={sortDirection}/>
                }
            </div>
        );
    };

    renderTable = (width) => {
        const {
            headerHeight,
            height,
            overscanRowCount,
            rowHeight,
            rowCount,
            sortBy,
            sortDirection,
            useDynamicRowHeight,
            list
        } = this.state;

        // const { list } = this.props;
        // const sortedList = this._isSortEnabled() ?
        //     list
        //         .sortBy(item => item[sortBy])
        //         .update(
        //             list => sortDirection === SortDirection.DESC ?
        //                 list.reverse() : list
        //         ) : list;

        const rowGetter = (params) => {
            const { index } = params;
            return this._getDatum(list, index);
        };

        return (
            <Table
                ref='Table'
                disableHeader={false}
                headerClassName={styles.headerColumn}
                headerHeight={headerHeight}
                height={height}
                noRowsRenderer={this._noRowsRenderer}
                overscanRowCount={overscanRowCount}
                rowClassName={this._rowClassName}
                rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
                rowGetter={rowGetter}
                rowCount={rowCount}
                sort={this._sort}
                sortBy={sortBy}
                sortDirection={sortDirection}
                width={width}
            >
                <Column
                    label='Index'
                    cellDataGetter={({ columnData, dataKey, rowData }) => rowData.index}
                    dataKey='index'
                    disableSort={!this._isSortEnabled()}
                    width={60}
                />
                <Column
                    dataKey='firstName'
                    disableSort={!this._isSortEnabled()}
                    headerRenderer={this._headerRenderer}
                    width={90}
                />
                <Column
                    width={210}
                    disableSort
                    label='last Name'
                    dataKey='lastName'
                    className={styles.exampleColumn}
                    cellRenderer={({ cellData, columnData, dataKey, rowData, rowIndex }) => cellData}
                    flexGrow={1}
                />
            </Table>
        );
    };

    handleOnDeleteColumnGroup = (item) => {
        const index = this.state.groupingColumns.indexOf(item);
        this.setState({
            groupingColumns: [
                ...this.state.groupingColumns.slice(0, index),
                ...this.state.groupingColumns.slice(index + 1, this.state.groupingColumns.length)
            ]
        });
    };

    handleOnColumnGrouping = (index) => {
        const col = columns[index];
        let groupingColumns = [...this.state.groupingColumns];
        const groupIndex = groupingColumns.indexOf(col.name);

        if (groupIndex >= 0) {
            groupingColumns = [
                ...groupingColumns.slice(0, groupIndex),
                ...groupingColumns.slice(groupIndex + 1, groupingColumns.length)
            ];
        } else {
            groupingColumns.push(col.name);
        }

        this.setState({ groupingColumns });
    };

    render() {
        return (
            <div className={styles.Body}>
                <GroupingColumnsBox
                    handleOnDeleteColumnGroup={this.handleOnDeleteColumnGroup}
                    handleOnColumnGrouping={this.handleOnColumnGrouping}
                    groupingColumns={this.state.groupingColumns}
                />
                <div className={styles.column}>
                    <AutoSizer disableHeight>
                        {({ width }) => this.renderTable(width) }
                    </AutoSizer>
                </div>
            </div>
        );
    }
}


TableExample.PropTypes = {
    list: PropTypes.instanceOf(Immutable.List).isRequired
};

export default TableExample;
