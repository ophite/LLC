import React, { Component, PropTypes } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import './ColumnResizer.css';
import SortIndicator from './SortIndicator'
import shouldPureComponentUpdate from './shouldPureComponentUpdate';


const specSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
            left: props.left,
            top: props.top
        };
    },

    // endDrag(props, monitor) {
    //     const { id: droppedId, originalIndex } = monitor.getItem();
    //     const didDrop = monitor.didDrop();
    //     if (!didDrop) {
    //     }
    //
    //     return false
    // },

    isDragging(props, monitor) {
        const item = monitor.getItem();
        const dragIndex = item.index;
        const hoverIndex = props.index;
        return dragIndex !== hoverIndex;
    }
};


const collectTarget = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    };
};


function getStyles(props) {
    const { left, top, isDragging } = props;
    const transform = `translate3d(${left}px, ${top}px, 0)`;

    return {
        position: 'absolute',
        transform: transform,
        WebkitTransform: transform,
        // IE fallback: hide the real node using CSS when dragging
        // because IE will ignore our custom "empty image" drag preview.
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : ''
    };
}

const collectSource = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
};

const layerStyles = {
    cursor: 'e-resize',
};

class ColumnResizerComponent extends Component {
    render() {
        const { height } = this.props;
        return (
            <div className="vertical-line" style={Object.assign(layerStyles, {height})}>
            </div>
        );
    }
}
//
// class ColumnDragResizerComponent extends Component {
//     render() {
//         const { height } = this.props;
//         return (
//             <div className="vertical-line-drag" style={Object.assign(layerStyles, {height})}>
//             </div>
//         );
//     }
// }

@DragSource("RESIZER", specSource, collectSource)
class ColumnResizer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    componentDidMount() {
        // Use empty image as a drag preview so browsers don't draw it
        // and we can draw whatever we want on the custom drag layer instead.
        this.props.connectDragPreview(getEmptyImage(), {
            // IE fallback: specify that we'd rather screenshot the node
            // when it already knows it's being dragged so we can hide it with CSS.
            captureDraggingState: true
        });
    }

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
            <div /*style={getStyles(this.props)}*/>
                <ColumnResizerComponent
                    height={height}
                />
            </div>
        );
    }
}

export {
    ColumnResizer,
    ColumnResizerComponent,
    // ColumnDragResizerComponent
};
