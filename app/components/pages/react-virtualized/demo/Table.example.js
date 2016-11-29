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
import SortableContainer from 'react-sortable-hoc/src/SortableContainer';
import SortableElement from 'react-sortable-hoc/src/SortableElement';
import { arrayMove } from 'react-sortable-hoc/src/utils';
import Immutable from 'immutable'

import SortDirection from './SortDirection'
import SortIndicator from './SortIndicator'

import './styles.css';
import styles from './Table.example.css'


const SortableTable = SortableContainer(Table);


class TableExample extends Component {

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
            useDynamicRowHeight: false,
            columns: [
                ({ index })=> {
                    return {
                        key: index,
                        headerRenderer: this._headerRendererDnd.bind(this, index),
                        label: 'Index',
                        dataKey: 'index',
                        cellDataGetter: ({ columnData, dataKey, rowData }) => rowData.index,
                        disableSort: !this._isSortEnabled(),
                        width: 60
                    }
                },
                ({ index })=> {
                    return {
                        key: index,
                        headerRenderer: this._headerRendererDnd.bind(this, index),
                        label: 'first Name',
                        dataKey: 'firstName',
                        disableSort: !this._isSortEnabled(),
                        width: 90
                    }
                },
                ({ index })=> {
                    return {
                        key: index,
                        headerRenderer: this._headerRendererDnd.bind(this, index),
                        label: 'last Name',
                        dataKey: 'lastName',
                        width: 210,
                        disableSort: true,
                        className: styles.exampleColumn,
                        cellRenderer: ({ cellData, columnData, dataKey, rowData, rowIndex }) => cellData,
                        flexGrow: 1
                    }
                }
            ]
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

    _onSortEnd = (props) => {
        const { list } = this.state;
        const { oldIndex, newIndex } = props;
        this.setState({
            list: Immutable.List(arrayMove(list.toArray(), oldIndex, newIndex))
        });
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

    _headerRendererDnd = (index, params) => {
        const extendedProps = {
            ...params,
            index
        };

        const header = (props) => {
            return (
                <div>
                    {defaultHeaderRenderer(props)}
                </div>
            );
        };

        const Header = SortableElement(header);
        return <Header {...extendedProps} />
    };

    renderColumns = () => {
        return this.state.columns.map((getColumnProps, index) => {
            return <Column {...getColumnProps({ index })}/>;
        });
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
            <SortableTable
                ref='Table'
                axis={'x'}
                pressDelay={0}
                disableHeader={false}
                onSortEnd={this._onSortEnd}
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
                {this.renderColumns()}
            </SortableTable>
        );
    };

    render() {
        return (
            <div className={styles.Body}>
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
