import React, { Component, PropTypes } from 'react'
import { DragSource, DropTarget } from 'react-dnd';

import stylesGrid from "../../../../assets/styles/components/react-grid.scss";
import SortIndicator from './SortIndicator'


const specSource = {
    beginDrag(props) {
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

@DropTarget("CARD", specTarget, collectTarget)
@DragSource("CARD", specSource, collectSource)
class Header extends Component {
    render() {
        const {
            columnData,
            dataKey,
            disableSort,
            label,
            sortBy,
            sortDirection
        } = this.props;

        const { isOver, canDrop, connectDragSource, connectDropTarget } = this.props;
        const showSortIndicator = sortBy === dataKey;

        return connectDragSource(connectDropTarget(
            <div className={canDrop && isOver && stylesGrid["active"]}>
               <span
                   className='ReactVirtualized__Table__headerTruncatedText'
                   key='label'
                   title={label}
               >
                {label}
                </span>
                {
                    showSortIndicator &&
                    <SortIndicator
                        key='SortIndicator'
                        sortDirection={sortDirection}
                    />
                }
            </div>
        ));
    }
}

export {
    Header
};
