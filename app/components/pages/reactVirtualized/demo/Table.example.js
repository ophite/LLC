import React, { Component, PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
// import { Table, Column } from 'react-virtualized'
import { Table, Column } from 'react-virtualized/source/Table'
// import { AutoSizer } from 'react-virtualized'
import { AutoSizer } from 'react-virtualized/source/AutoSizer'
import Immutable from 'immutable'

// import './styles.css';
import styles from '../../../../assets/styles/components/react-virtualized.scss'
import { GroupingColumnsBox } from '../../reactDatagrid/GroupingColumnsBox/GroupingColumnsBox.jsx';
import { Header } from './Header';
import SortDirection from './SortDirection'
import { arrayCutItem, arraySwipeItem } from '../../../../utils/helper';
import customRowRenderer from './customRowRenderer'
import customRowGroupping from './customRowGroupping'


class TableComponent extends Component {

    //region lifecycle

    // _isSortEnabled = () => {
    //     const { list } = this.props;
    //     const { rowCount } = this.state;
    //     return rowCount <= list.size
    // };

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
            groupInfo: customRowGroupping({
                list: props.list.toArray(),
                groupBy: [
                    'firstName',
                    'index'
                ],
                toggleBy: null
            }),
            groupingColumns: [
                'firstName',
                'index',
            ],
            columns: [
                {
                    dataKey: 'index',
                    label: 'Index',
                    width: 160,
                    headerRenderer: this.renderHeader,
                    cellDataGetter: ({ columnData, dataKey, rowData }) => rowData.index,
                    // disableSort: !this._isSortEnabled()
                },
                {
                    dataKey: 'firstName',
                    label: 'first Name',
                    width: 230,
                    headerRenderer: this.renderHeader,
                    // disableSort: !this._isSortEnabled()
                },
                {
                    dataKey: 'lastName',
                    label: 'last Name',
                    width: 130,
                    headerRenderer: this.renderHeader,
                    disableSort: true,
                    className: styles.exampleColumn,
                    cellRenderer: ({ cellData, columnData, dataKey, rowData, rowIndex }) => cellData,
                    flexGrow: 1
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

    _onRowClick = (ev) => {
        if (ev && ev.sysMeta) {
            const { groupInfo } = this.state;
            groupInfo.toggleBy = ev.sysMeta;

            this.setState({
                groupInfo: customRowGroupping(groupInfo)
            });
        }
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

    handleOnDeleteColumnGroup = (item) => {
        const index = this.state.groupingColumns.indexOf(item);
        const groupingColumns = arrayCutItem(this.state.groupingColumns, index);

        const { groupInfo } = this.state;
        groupInfo.groupBy = [...groupingColumns];

        this.setState({
            groupingColumns: groupingColumns,
            groupInfo: customRowGroupping(groupInfo)
        });
    };

    handleColumnResize = (dragIndex, hoverIndex, deltaWidth) => {
        // debugger
        const columns = [...this.state.columns];
        if (dragIndex !== hoverIndex) {
            columns[dragIndex].width = columns[dragIndex].width + deltaWidth;
            columns[hoverIndex].width = columns[hoverIndex].width - deltaWidth;
        } else {
            if (dragIndex === columns.length - 1) {
                columns[dragIndex].width = columns[dragIndex].width + deltaWidth;
                columns[dragIndex - 1].width = columns[dragIndex - 1].width - deltaWidth;
            } else {
                columns[dragIndex].width = columns[dragIndex].width + deltaWidth;
                columns[dragIndex + 1].width = columns[dragIndex + 1].width - deltaWidth;
            }
        }
        this.setState({ columns: [...columns] });
    };

    handleOnColumnOrder = (dragIndex, hoverIndex) => {
        const columns = [...this.state.columns];
        arraySwipeItem(columns, dragIndex, hoverIndex);
        this.setState({ columns });
    };

    handleOnColumnGrouping = (index) => {
        const col = this.state.columns[index];
        let groupingColumns = [...this.state.groupingColumns];
        const groupIndex = groupingColumns.indexOf(col.dataKey);

        if (groupIndex >= 0) {
            groupingColumns = arrayCutItem(groupingColumns, groupIndex);
        } else {
            groupingColumns.push(col.dataKey);
        }

        const { groupInfo } = this.state;
        groupInfo.groupBy = [...groupingColumns];

        this.setState({
            groupingColumns: groupingColumns,
            groupInfo: customRowGroupping(groupInfo)
        });
    };

    //endregion

    //region render

    renderHeader = (params) => {
        const {
            headerHeight,
            height,
            overscanRowCount,
            rowHeight,
            rowCount,
            sortBy,
            sortDirection,
            useDynamicRowHeight,
            list,
            groupInfo
        } = this.state;

        const index = this.state
            .columns
            .map((columnProps, index) => columnProps.dataKey)
            .indexOf(params.dataKey);

        // TODO refactor this file!
        const width = this.state.columns[index].width;
        const {
            uuid,
            layoutPropsSize
        } = this.props;

        return (
            <Header
                {
                    ...Object.assign(
                        {
                            tableUuid: uuid,
                            key: index,
                            handleColumnResize: this.handleColumnResize,
                            handleColumnOrder: this.handleOnColumnOrder,
                            index,
                            width,
                            headerHeight,
                            height: layoutPropsSize.height || height,
                            last: index === this.state.columns.length - 1
                        }, params)
                }
            />
        );
    };

    renderColumns = () => {
        return this.state
            .columns
            .map((columnProps, index) => {
                return <Column {...columnProps}/>;
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
            list,
            groupInfo
        } = this.state;
        const { layoutPropsSize } = this.props;

        // TODO add sorting multiple columns
        /*
         const sortedList = this._isSortEnabled() ?
         list
         .sortBy(item => item[sortBy])
         .update(
         list => sortDirection === SortDirection.DESC ?
         list.reverse() : list
         ) : list;
         */

        const rowGetter = (params) => {
            const { index } = params;
            const immutableList = Immutable.List(groupInfo.grouppedList);

            return this._getDatum(immutableList, index);
        };

        return (
            <Table
                ref='Table'
                key="Table"
                disableHeader={false}
                headerClassName={styles.headerColumn}
                headerHeight={headerHeight}
                height={layoutPropsSize.height || height}
                noRowsRenderer={this._noRowsRenderer}
                overscanRowCount={overscanRowCount}
                rowClassName={this._rowClassName}
                rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
                rowGetter={rowGetter}
                rowCount={rowCount}
                rowRenderer={customRowRenderer}
                sort={this._sort}
                sortBy={sortBy}
                sortDirection={sortDirection}
                width={width}
                onRowClick={this._onRowClick}
            >
                {this.renderColumns()}
            </Table>
        );
    };

    render() {
        return (
            <div className={styles.Body}>
                <GroupingColumnsBox
                    tableUuid={this.props.uuid}
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
