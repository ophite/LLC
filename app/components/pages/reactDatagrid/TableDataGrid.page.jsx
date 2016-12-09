import React, { Component, PropTypes } from 'react'
import GoldenLayoutPage from '../goldenLayout/Golden.layout.page.jsx';
import 'react-datagrid/index.css';
import DataGrid from 'react-datagrid/src';
import { GroupingColumnsBox } from './GroupingColumnsBox/GroupingColumnsBox.jsx';
import { data, columns } from './gridData'
import sorty from 'sorty';

var sort = sorty([{ name: 'country', dir: 'asc' }])
const initialData = data.slice();


class TableDatagridPage extends GoldenLayoutPage {
 
    constructor(props, context) {
        super(props, context);
        this.state = {
            groupingColumns: [
                'country',
                'grade',
            ],
            dataSource: data,
            SORT_INFO: [{ name: 'country', dir: 'asc' }],
        };
    }

    handleOnColumnResize = (firstCol, firstSize, secondCol, secondSize) => {
        firstCol.width = firstSize;
        this.forceUpdate();
    };

    handleOnColumnOrder = (dragIndex, hoverIndex) => {
        const col = columns[dragIndex];
        columns.splice(dragIndex, 1);
        columns.splice(hoverIndex, 0, col);
        this.forceUpdate();
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

    handleFilter = (column, value, allFilterValues) => {
        //reset data to original data-array
        let dataSource = initialData;

        //go over all filters and apply them
        Object.keys(allFilterValues).forEach(function (name) {
            var columnFilter = (allFilterValues[name] + '').toUpperCase()

            if (columnFilter == '') {
                return
            }

            dataSource = dataSource.filter(function (item) {
                if ((item[name] + '').toUpperCase().indexOf(columnFilter) === 0) {
                    return true
                }
            })
        });
        this.setState({
            dataSource
        });
    };

    handleResetFilter = () => {
        this.setState({
            dataSource: initialData
        });
    };

    handleSortChange = (sortInfo) => {
        let dataSource = this.state.dataSource.slice();

        dataSource = [].concat(initialData)
        dataSource = sorty(sortInfo, dataSource)

        this.setState({
            SORT_INFO: sortInfo,
            dataSource,
        });
    };

    renderTable() {
        const props = {
            ref: "dataGrid",
            idProperty: 'id',
            dataSource: this.state.dataSource,
            columns: columns,
            style: { height: 400 },
            sortInfo: this.state.SORT_INFO,
            onColumnResize: this.handleOnColumnResize,
            handleColumnOrder: this.handleOnColumnOrder,
            handleFilter: this.handleFilter,
            handleResetFilter: this.handleResetFilter,
            onSortChange: this.handleSortChange
        };

        if (this.state.groupingColumns.length) {
            props.groupBy = this.state.groupingColumns;
        }

        return (
            <DataGrid {...props} />
        );
    }

    render() {
        return (
            <div ref={(ref) => this.goldenWindow = ref}>
                <GroupingColumnsBox
                    handleOnDeleteColumnGroup={this.handleOnDeleteColumnGroup}
                    handleOnColumnGrouping={this.handleOnColumnGrouping}
                    groupingColumns={this.state.groupingColumns}
                />
                {this.renderTable()}
            </div>
        );
    }
}

export default TableDatagridPage;
