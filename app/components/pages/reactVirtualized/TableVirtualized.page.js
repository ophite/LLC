import React, { Component, PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
// import { Table, Column } from 'react-virtualized'
import { Table, Column } from 'react-virtualized/source/Table'
// import { AutoSizer } from 'react-virtualized'
import { AutoSizer } from 'react-virtualized/source/AutoSizer'
import Immutable from 'immutable'

// import './styles.css';
import styles from '../../../assets/styles/components/react-virtualized.scss'
import GoldenLayoutPage from '../goldenLayout/Golden.layout.page.jsx';
import { GroupingColumnsBox } from '../../controls/groupedColumnsBox/GroupingColumnsBox';
import { Header } from './header/Header';
import SortDirection from './column/SortDirection'
import { arrayCutItem, arraySwipeItem } from '../../../utils/helper';
import customRowRenderer from './grouping/customRowRenderer'
import customRowGroupping from './grouping/customRowGroupping'


class TableComponent extends GoldenLayoutPage {

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
            filteredList: props.list,
            filterConfig: {},
            isFilterVisible: false,
            headerHeight: 55,
            filterHeight: 30,
            height: 500,
            overscanRowCount: 10,
            rowHeight: 55,
            rowCount: 100,
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
                'first Name',
                'index',
            ],
            columns: [
                {
                    dataKey: 'index',
                    label: 'Index',
                    width: 160,
                    minWidth: 100,
                    headerRenderer: this.renderHeader,
                    cellDataGetter: ({ columnData, dataKey, rowData }) => rowData.index,
                    // disableSort: !this._isSortEnabled()
                },
                {
                    dataKey: 'firstName',
                    label: 'first Name',
                    width: 230,
                    minWidth: 100,
                    headerRenderer: this.renderHeader,
                    // disableSort: !this._isSortEnabled()
                },
                {
                    dataKey: 'lastName',
                    label: 'last Name',
                    width: 130,
                    minWidth: 100,
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

    handleFilter = (dataKey, e) => {
        const { list } = this.props;
        const filterConfig = { ...this.state.filterConfig };
        filterConfig[dataKey] = e.target.value;

        const filteredList = list.toArray().filter(item => {
            let filtered = 0;
            Object.keys(filterConfig).forEach(key => {
                if (item[key].toString().toLowerCase().indexOf(filterConfig[key].toLowerCase()) > -1) {
                    filtered++;
                }
            });

            return filtered === Object.keys(filterConfig).length;
        });

        this.setState({
            filteredList: Immutable.List(filteredList),
            filterConfig,
            rowCount: filteredList.length,
        });
    };

    handleResetFilter = () => {
        this.setState({
            filteredList: this.props.list,
            filterConfig: {},
            rowCount: 100,
        });
    };

    handleToggleFilter = () => {
        const { isFilterVisible, headerHeight, filterHeight } = this.state;
        this.setState({
            isFilterVisible: !isFilterVisible,
            headerHeight: isFilterVisible ? headerHeight - filterHeight : headerHeight + filterHeight
        });
    };

    //endregion

    //region render

    renderFilterControls = () => {
        const { isFilterVisible } = this.state;

        return (
            <div className="react-grid__filters">
                {
                    isFilterVisible
                        ?
                        <div onClick={this.handleToggleFilter} className="react-grid__filter-item">Hide filter</div>
                        :
                        <div onClick={this.handleToggleFilter} className="react-grid__filter-item">Show filter</div>
                }
                <div onClick={this.handleResetFilter} className="react-grid__filter-item">Reset filter</div>
            </div>
        );
    };

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
            groupInfo,
            isFilterVisible,
            filterConfig,
        } = this.state;

        const index = this.state
            .columns
            .map((columnProps, index) => columnProps.dataKey)
            .indexOf(params.dataKey);

        // TODO refactor this file!
        const column = this.state.columns[index];
        const {
            width,
            minWidth
        } = column;


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
                            handleFilter: this.handleFilter,
                            isFilterVisible,
                            filterConfig,
                            index,
                            width,
                            minWidth,
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
                return (
                    <Column
                        {...columnProps}
                        key={index}
                    />
                );
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
            // const immutableList = this.state.filteredList;

            return this._getDatum(immutableList, index);
        };

        return (
            <Table
                ref='Table'
                disableHeader={false}
                headerClassName={styles.headerColumn}
                headerHeight={headerHeight}
                height={Math.max(layoutPropsSize.height || height, height)}
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
            <div ref={(ref) => this.goldenWindow = ref}>
                <div className={styles.Body}>
                    <GroupingColumnsBox
                        tableUuid={this.props.uuid}
                        handleOnDeleteColumnGroup={this.handleOnDeleteColumnGroup}
                        handleOnColumnGrouping={this.handleOnColumnGrouping}
                        groupingColumns={this.state.groupingColumns}
                    />
                    {this.renderFilterControls()}
                    <div className={styles.column}>
                        <AutoSizer disableHeight>
                            {({ width }) => this.renderTable(width) }
                        </AutoSizer>
                    </div>
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
