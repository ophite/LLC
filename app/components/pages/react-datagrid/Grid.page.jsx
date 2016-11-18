import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import 'react-datagrid/index.css';
import DataGrid from 'react-datagrid/src';
import { GroupingColumnsBox } from './GroupingColumnsBox/GroupingColumnsBox.jsx';
import { data, columns } from './gridData'

let dataSource = data;
const initialData = dataSource.slice();


@DragDropContext(HTML5Backend)
class GridPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            groupingColumns: [
                'country',
                'grade',
            ]
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
        dataSource = initialData;

        //go over all filters and apply them
        Object.keys(allFilterValues).forEach(function(name){
            var columnFilter = (allFilterValues[name] + '').toUpperCase()

            if (columnFilter == ''){
                return
            }

            dataSource = dataSource.filter(function(item){
                if ((item[name] + '').toUpperCase().indexOf(columnFilter) === 0){
                    return true
                }
            })
        });
        this.forceUpdate();
    };

    handleResetFilter = () => {
        dataSource = initialData;
        this.forceUpdate();
    };

    renderGrid() {
        const props = {
            ref: "dataGrid",
            idProperty: 'id',
            dataSource: dataSource,
            columns: columns,
            style: { height: 400 },
            onColumnResize: this.handleOnColumnResize,
            handleColumnOrder: this.handleOnColumnOrder,
            handleFilter:this.handleFilter,
            handleResetFilter:this.handleResetFilter
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
            <div>
                <GroupingColumnsBox
                    handleOnDeleteColumnGroup={this.handleOnDeleteColumnGroup}
                    handleOnColumnGrouping={this.handleOnColumnGrouping}
                    groupingColumns={this.state.groupingColumns}
                />
                {this.renderGrid()}
            </div>
        );
    }
}

export default GridPage;
