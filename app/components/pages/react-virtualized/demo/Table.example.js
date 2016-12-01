import React, { Component, PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import { Table, Column } from 'react-virtualized/source/Table'
import { AutoSizer } from 'react-virtualized/source/AutoSizer'
import Immutable from 'immutable'


// import './styles.css';
import styles from '../../../../assets/styles/components/react-virtualized.scss'
import { GroupingColumnsBox } from '../../react-datagrid/GroupingColumnsBox/GroupingColumnsBox.jsx';
import { Header } from './Header';
import SortDirection from './SortDirection'
import { arrayCutItem, arraySwipeItem } from '../../../../utils/helper';


const SortableTable = SortableContainer(Table);
const SortableTableRowRenderer = SortableElement(defaultTableRowRenderer);

function rowRenderer(props) {
    return <SortableTableRowRenderer {...props} />
}


class TableComponent extends Component {
    // static contextTypes = {
    //     list: PropTypes.instanceOf(Immutable.List).isRequired
    // };

    //region lifecycle

    constructor(props, context) {
        super(props, context);
        this.state = {
            list: props.list,
            headerHeight: 55,
            height: 500,
            overscanRowCount: 10,
            rowHeight: 55,
            rowCount: 1000,
            sortBy: 'index',
            sortDirection: SortDirection.ASC,
            useDynamicRowHeight: false,
            groupingColumns: [
                'firstName',
                'index',
            ],
            columns: [
                ({ index })=> {
                    return {
                        key: index,
                        dataKey: 'index',
                        label: 'Index',
                        index,
                        width: 60,
                        headerRenderer: this.renderHeader,
                        cellDataGetter: ({ columnData, dataKey, rowData }) => rowData.index,
                        disableSort: !this._isSortEnabled()
                    }
                },
                ({ index })=> {
                    return {
                        key: index,
                        dataKey: 'firstName',
                        label: 'first Name',
                        index,
                        width: 90,
                        headerRenderer: this.renderHeader,
                        disableSort: !this._isSortEnabled()
                    }
                },
                ({ index })=> {
                    return {
                        key: index,
                        dataKey: 'lastName',
                        label: 'last Name',
                        index,
                        width: 210,
                        headerRenderer: this.renderHeader,
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

    //endregion

    //region private

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

    renderHeader = (params) => {
        const index = this.state.columns
            .map((getColumnProps, index) => getColumnProps({ index }).dataKey)
            .indexOf(params.dataKey);

        return (
            <Header
                {
                    ...{
                        handleColumnOrder: this.handleOnColumnOrder,
                        index
                    }
                }
                {...params}
            />
        )
    };

    handleOnDeleteColumnGroup = (item) => {
        const index = this.state.groupingColumns.indexOf(item);
        this.setState({
            groupingColumns: arrayCutItem(this.state.groupingColumns, index)
        });
    };

    handleOnColumnOrder = (dragIndex, hoverIndex) => {
        const columns = [...this.state.columns];
        arraySwipeItem(columns, dragIndex, hoverIndex);
        this.setState({ columns });
    };

    handleOnColumnGrouping = (index) => {
        const col = this.state.columns[index]({ index });
        let groupingColumns = [...this.state.groupingColumns];
        const groupIndex = groupingColumns.indexOf(col.dataKey);

        if (groupIndex >= 0) {
            groupingColumns = arrayCutItem(groupingColumns, groupIndex);
        } else {
            groupingColumns.push(col.dataKey);
        }

        this.setState({ groupingColumns });
    };

    //endregion

    //region render

    renderColumns = () => {
        return this.state
            .columns
            .map((getColumnProps, index) => {
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

        // TODO add sorting multiple columns
        const sortedList = this._isSortEnabled() ?
            list
                .sortBy(item => item[sortBy])
                .update(
                    list => sortDirection === SortDirection.DESC ?
                        list.reverse() : list
                ) : list;

        const rowGetter = (params) => {
            const { index } = params;
            return this._getDatum(sortedList, index);
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
                {this.renderColumns()}
            </Table>
        );
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

    //endregion
}


TableComponent.PropTypes = {
    list: PropTypes.instanceOf(Immutable.List).isRequired
};

export default TableComponent;
