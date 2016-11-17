import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import 'react-datagrid/index.css';
import DataGrid from 'react-datagrid/lib';
import { data } from './gridData'
import { DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';



const columns = [
    { name: 'index', title: '#', width: 150 },
    { name: 'firstName' },
    { name: 'country' },
    { name: 'grade' }
];


const style = {
    border: '1px solid gray',
    height: '15rem',
    width: '15rem',
    padding: '2rem',
    textAlign: 'center'
};

const boxTarget = {
    drop(props, monitor, component) {
        const tItem = monitor.getItem();
        if (!tItem) {
            return
        }
        const dragIndex = tItem.index;
        const hoverIndex = props.index;
        props.handleColumnGrouping(dragIndex, hoverIndex);
    }
};

@DropTarget("CARD", boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))
class TargetBox extends React.Component {
    static propTypes = {
        connectDropTarget: React.PropTypes.func.isRequired,
        isOver: React.PropTypes.bool.isRequired,
        canDrop: React.PropTypes.bool.isRequired,
        columns: React.PropTypes.array,
        handleColumnGrouping: React.PropTypes.func
    };

    renderGroupingColumns = () => {
        if (!this.props.groupingColumns.length) {
            return null;
        }

        return (
            <div>
                Grouped columns: {this.props.groupingColumns.join(', ')}
            </div>
        );
    };

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;

        return connectDropTarget(
            <div style={style}>
                {this.renderGroupingColumns()}
                <div>
                    {isActive ?
                        'Release to drop' :
                        'Drag item here'
                    }
                </div>
            </div>
        );
    }
}


@DragDropContext(HTML5Backend)
class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleOnColumnResize = this.handleOnColumnResize.bind(this);
        this.handleColumnGrouping = this.handleColumnGrouping.bind(this);
        this.handleColumnOrder = this.handleColumnOrder.bind(this);
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

    handleColumnGrouping = (dragIndex, hoverIndex) => {
        const col = columns[dragIndex];
        this.handleMenuColumnsGrouping(col.name);
    };

    handleSortChange(sortInfo) {
        // SORT_INFO = sortInfo
        // data = sort(data)
        // this.setState({})
    }

    // handleColumnOrderChange = (index, dropIndex) => {
    //     const col = columns[index];
    //     columns.splice(index, 1); //delete from index, 1 item
    //     columns.splice(dropIndex, 0, col);
    //     this.forceUpdate();
    // };

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
                <TargetBox
                    handleColumnGrouping={this.handleColumnGrouping}
                    groupingColumns={this.state.groupingColumns}
                />
                {this.renderMenuGroupingColumns()}
                {this.renderDragAreaForGroupingColumns()}
                {this.renderGrid()}
            </div>
        );
    }
}

export default App;
