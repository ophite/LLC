import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import 'react-datagrid/index.css';
import DataGrid from 'react-datagrid/lib';
import { data } from './gridData'


const columns = [
    { name: 'index', title: '#', width: 150 },
    { name: 'firstName' },
    { name: 'country' },
    { name: 'grade' }
];


class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            groupingColumns: [
                {
                    name: 'country',
                    activate: true,
                    date: new Date()
                },
                {
                    name: 'grade',
                    activate: true,
                    date: new Date()
                }
            ]
        };
    }

    _getGroupingColumns() {
        const columns = [];
        this.state.groupingColumns
            .sort(item => item.date)
            .forEach((item, index) => {
                if (item.activate) {
                    columns.push(item.name);
                }
            });

        return columns;
    };

    handleOnColumnResize = (firstCol, firstSize, secondCol, secondSize) => {
        firstCol.width = firstSize;
        this.forceUpdate();
    };

    handleMenuColumnsGrouping = (menuItem) => {
        let index = -1;
        this.state.groupingColumns.forEach((item, indexLocal) => {
            if (item.name === menuItem) {
                index = indexLocal;
            }
        });

        let item = {
            name: menuItem,
            activate: true,
            date: new Date()
        };
        if (index >= 0) {
            item = this.state.groupingColumns[index];
            item.activate = !item.activate;

            this.state.groupingColumns = [
                ...this.state.groupingColumns.slice(0, index),
                ...this.state.groupingColumns.slice(index + 1, this.state.groupingColumns.length)
            ];
        }

        this.setState({
            ...this.state,
            groupingColumns: [
                ...this.state.groupingColumns,
                item
            ]
        });
    };

    handleColumnOrderChange = (index, dropIndex) => {
        var col = columns[index]
        columns.splice(index, 1) //delete from index, 1 item
        columns.splice(dropIndex, 0, col)
        this.forceUpdate();
    };

    renderMenuColumnsGrouping() {
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

    renderGroupingColumns = () => {
        if (!this._getGroupingColumns().length) {
            return null;
        }

        return (
            <div>
                Grouped columns: {this._getGroupingColumns().join(', ')}
            </div>
        );
    };

    renderDragAreaForGroupingColumns = () => {
        const divStyle = {
            height: '100px',
        };

        return (
            <div style={divStyle}>
                Drag here
            </div>
        );
    };

    renderGrid() {
        const groupedColumns = this._getGroupingColumns();
        if (!groupedColumns.length) {
            return (
                <DataGrid
                    idProperty='id'
                    dataSource={data}
                    columns={columns}
                    style={{height: 400}}
                    onColumnResize={this.handleOnColumnResize}
                    onColumnOrderChange={this.handleColumnOrderChange}
                />
            );
        }

        return (
            <DataGrid
                idProperty='id'
                dataSource={data}
                columns={columns}
                style={{height: 400}}
                groupBy={groupedColumns}
                onColumnResize={this.handleOnColumnResize}
                onColumnOrderChange={this.handleColumnOrderChange}
            />
        );
    }

    render() {
        return (
            <div>
                {this.renderMenuColumnsGrouping()}
                {this.renderGroupingColumns()}
                {this.renderDragAreaForGroupingColumns()}
                {this.renderGrid()}
            </div>
        );
    }
}

export default App;
