import React, { Component, PropTypes } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import shouldPureComponentUpdate from '../../../utils/shouldPureComponentUpdate';
import { ColumnResizer } from './ColumnResizer'
import { DND_RESIZER } from './ColumnResizer.constants';

const specificationsSource = {

    beginDrag(props, monitor) {
        return {
            id: props.id,
            index: props.index,
            tableUuid: props.tableUuid,
        };
    },

    endDrag(props, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
            return;
        }

        const item = monitor.getItem();
        const itemType = monitor.getItemType();
        if (!item) {
            return false;
        }

        switch (itemType) {
            case DND_RESIZER:
            {
                const initialOffset = monitor.getInitialSourceClientOffset();
                const currentOffset = monitor.getSourceClientOffset();
                const deltaWidth = currentOffset.x - initialOffset.x;
                const dragIndex = item.index;
                const hoverIndex = props.index;

                if (props.tableUuid === item.tableUuid) {
                    props.handleColumnResize(dragIndex, hoverIndex, deltaWidth);
                }

                break;
            }
            default:
            {
                break;
            }
        }

        return false
    },

    isDragging(props, monitor) {
        const item = monitor.getItem();
        return item.tableUuid === props.tableUuid;
    }
};

const propsSource = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
};

@DragSource(DND_RESIZER, specificationsSource, propsSource)
class ColumnResizerContainer extends Component {

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
        const { height } = this.props;
        const { connectDragSource } = this.props;

        return connectDragSource(
            <div>
                <ColumnResizer
                    height={height}
                />
            </div>
        );
    }
}

ColumnResizerContainer.PropTypes = {
    height: PropTypes.number.isRequired
};

export {
    ColumnResizerContainer,
};
