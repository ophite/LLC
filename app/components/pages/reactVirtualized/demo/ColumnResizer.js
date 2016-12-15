import React, { Component, PropTypes } from 'react'
import { DragSource, DropTarget } from 'react-dnd';

import './ColumnResizer.css';
import SortIndicator from './SortIndicator'


const specSource = {
    beginDrag(props) {
        console.log('beginDrag')
        return {
            id: props.id,
            index: props.index
        };
    },

    isDragging(props, monitor) {
        const item = monitor.getItem();
        const dragIndex = item.index;
        const hoverIndex = props.index;
        return dragIndex !== hoverIndex;
    }
};

const specTarget = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        if (!item) {
            return
        }
        const dragIndex = item.index;
        const hoverIndex = props.index;
        if (dragIndex != hoverIndex) {
            props.handleColumnOrder(dragIndex, hoverIndex);
        }
    },
    canDrop(props, monitor) {
        const tItem = monitor.getItem();
        const dragIndex = tItem.index;
        const hoverIndex = props.index;

        return dragIndex != hoverIndex;
    }
};


const collectTarget = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    };
};


const collectSource = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

@DragSource("RESIZER", specSource, collectSource)
class ColumnResizer extends Component {

    render() {
        const {
            columnData,
            dataKey,
            disableSort,
            label,
            sortBy,
            sortDirection,
            width,
            height
        } = this.props;
        const { isOver, canDrop, connectDragSource } = this.props;

        return connectDragSource(
            <div className="vertical-line" style={{height}}>
            </div>
        );
    }
}

export {
    ColumnResizer
};
