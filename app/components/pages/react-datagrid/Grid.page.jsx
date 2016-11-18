import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import 'react-datagrid/index.css';
import DataGrid from 'react-datagrid/src';
import { GroupingColumnsBox } from './GroupingColumnsBox/GroupingColumnsBox.jsx';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import { data } from './gridData'


const columns = [
    { name: 'index', title: '#', width: 150 },
    { name: 'firstName' },
    { name: 'country' },
    { name: 'grade' }
];


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
        // this.setState({});
        this.forceUpdate();
    };

    handleMenuColumnsGrouping = (menuItem) => {
        let groupingColumns = [...this.state.groupingColumns];
        const index = groupingColumns.indexOf(menuItem);

        if (index >= 0) {
            groupingColumns = [
                ...this.state.groupingColumns.slice(0, index),
                ...this.state.groupingColumns.slice(index + 1, this.state.groupingColumns.length)
            ];
        } else {
            groupingColumns.push(menuItem);
        }

        this.setState({ groupingColumns });
    };

    handleColumnOrder = (dragIndex, hoverIndex) => {
        const col = columns[dragIndex];
        columns.splice(dragIndex, 1); //delete from index, 1 item
        columns.splice(hoverIndex, 0, col);
        this.forceUpdate();
    };

    handleOnDeleteGroupedColumn = (item) => {
        const index = this.state.groupingColumns.indexOf(item);
        this.setState({
            groupingColumns: [
                ...this.state.groupingColumns.slice(0, index),
                ...this.state.groupingColumns.slice(index + 1, this.state.groupingColumns.length)
            ]
        });
    };

    handleColumnGrouping = (dragIndex, hoverIndex) => {
        const col = columns[dragIndex];
        this.handleMenuColumnsGrouping(col.name);
    };

    handleSortChange = (sortInfo) => {
        // SORT_INFO = sortInfo
        // data = sort(data)
        // this.setState({})
    };

    renderMenuGroupingColumns() {
        const menusView = columns
            .filter(c => c.name !== 'index')
            .map((c, index) => {
                return (
                    <MenuItem
                        key={index}
                        icon='fiber_manual_record'
                        value={c.name}
                        caption={c.name}
                    />
                );
            });

        return (
            <IconMenu onSelect={this.handleMenuColumnsGrouping} icon='more_vert' position='topLeft' menuRipple>
                {menusView}
            </IconMenu>
        );
    }

    renderGrid() {
        if (!this.state.groupingColumns.length) {
            return (
                <DataGrid
                    ref="dataGrid"
                    idProperty='id'
                    dataSource={data}
                    columns={columns}
                    style={{height: 400}}
                    onColumnResize={this.handleOnColumnResize}
                    handleColumnOrder={this.handleColumnOrder}
                />
            );
        }

        return (
            <DataGrid
                ref="dataGrid"
                idProperty='id'
                dataSource={data}
                columns={columns}
                style={{height: 400}}
                groupBy={this.state.groupingColumns}
                onColumnResize={this.handleOnColumnResize}
                handleColumnOrder={this.handleColumnOrder}
            />
        );
    }

    render() {
        return (
            <div>
                <GroupingColumnsBox
                    handleOnDeleteGroupedColumn={this.handleOnDeleteGroupedColumn}
                    handleColumnGrouping={this.handleColumnGrouping}
                    groupingColumns={this.state.groupingColumns}
                />
                {this.renderGrid()}
            </div>
        );
    }
}

export default GridPage;
