import React, { PropTypes, Component } from 'react';
import 'react-datagrid/index.css';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import Chip from 'react-toolbox/lib/chip';


const style = {
    border: '1px solid gray',
    height: '15rem',
    width: '15rem',
    padding: '2rem',
    textAlign: 'center'
};

const target = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        if (!item) {
            return
        }

        const dragIndex = item.index;
        const hoverIndex = props.index;
        props.handleColumnGrouping(dragIndex, hoverIndex);
    }
};

@DropTarget("CARD", target, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))
class GroupingColumnsBox extends Component {

    renderGroupingColumns = () => {
        const { groupingColumns, handleOnDeleteGroupedColumn } = this.props;
        if (!groupingColumns.length) {
            return null;
        }

        const chipsView = groupingColumns.map((col, index) => {
            return (
                <Chip
                    key={index}
                    onDeleteClick={handleOnDeleteGroupedColumn.bind(null, col)}
                    deletable
                >
                    {col}
                </Chip>
            )
        });

        return (
            <div>
                Grouped columns: {chipsView}
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

GroupingColumnsBox.PropTypes = {
    handleOnDeleteGroupedColumn: PropTypes.func,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    columns: PropTypes.array,
    handleColumnGrouping: PropTypes.func
};

export {
    GroupingColumnsBox
}
