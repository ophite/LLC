import React, { Component, PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import { AutoSizer, Table, Column, defaultTableRowRenderer } from 'react-virtualized'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import SortDirection from './SortDirection'
import SortIndicator from './SortIndicator'

import './styles.css';
import styles from './Table.example.css'


const SortableTable = SortableContainer(Table);
const SortableTableRowRenderer = SortableElement(defaultTableRowRenderer);

function rowRenderer(props) {
    return <SortableTableRowRenderer {...props} />
}


export default class TableExample extends Component {
    // static contextTypes = {
    //     list: PropTypes.instanceOf(Immutable.List).isRequired
    // };

    constructor(props, context) {
        super(props, context);

        this.state = {
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

    _onSortEnd = (props) => {
        const { list } = this.state;
        const { oldIndex, newIndex } = props;
        const buf = list[newIndex];
        list[newIndex] = list[oldIndex];
        list[oldIndex] = buf;
        this.setState({
            list: [...list]
        });
    };

    render() {
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
            <div className={styles.Body}>
                <div className={styles.column}>
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <SortableTable
                                ref='Table'
                                onSortEnd={this._onSortEnd}
                                disableHeader={false}
                                rowRenderer={rowRenderer}
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
                                    dataKey='name'
                                    disableSort={!this._isSortEnabled()}
                                    headerRenderer={this._headerRenderer}
                                    width={90}
                                />
                                <Column
                                    width={210}
                                    disableSort
                                    label='The description label is really long so that it will be truncated'
                                    dataKey='random'
                                    className={styles.exampleColumn}
                                    cellRenderer={({ cellData, columnData, dataKey, rowData, rowIndex }) => cellData}
                                    flexGrow={1}
                                />
                            </SortableTable>
                        )}
                    </AutoSizer>
                </div>
            </div>
        )
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return shallowCompare(this, nextProps, nextState)
    };

    _getDatum = (list, index) => {
        return list[index % list.length]
    };

    _getRowHeight = (params) => {
        const { index } = params;
        const { list } = this.props;
        return this._getDatum(list, index).length
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
                Full Name
                {
                    sortBy === dataKey &&
                    <SortIndicator sortDirection={sortDirection}/>
                }
            </div>
        )
    };

    _isSortEnabled = () => {
        const { list } = this.props;
        const { rowCount } = this.state;
        return rowCount <= list.length
    };

    _noRowsRenderer = () => {
        return (
            <div className={styles.noRows}>
                No rows
            </div>
        )
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
        this.setState({ sortBy, sortDirection })
    };
}
