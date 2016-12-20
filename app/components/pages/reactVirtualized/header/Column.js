import React, { Component, PropTypes } from 'react'
import { DragSource, DropTarget, DragLayer } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import stylesGrid from "../../../../assets/styles/components/react-grid.scss";
import SortIndicator from './SortIndicator';
import shouldPureComponentUpdate from '../../../../utils/react/shouldPureComponentUpdate';

import { DND_RESIZER } from '../../../controls/columnResizer/ColumnResizer.constants';


const specSource = {
    beginDrag(props) {
        return {
            id: props.id,
            tableUuid: props.tableUuid,
            index: props.index
        };
    },

    isDragging(props, monitor) {
        const item = monitor.getItem();
        const dragIndex = item.index;
        const hoverIndex = props.index;

        return dragIndex !== hoverIndex && item.tableUuid === props.tableUuid;
    }
};

const specTarget = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        const itemType = monitor.getItemType();
        if (!item) {
            return
        }

        switch (itemType) {
            case "CARD" :
            {
                const dragIndex = item.index;
                const hoverIndex = props.index;
                if (dragIndex != hoverIndex && props.tableUuid === item.tableUuid) {
                    // debugger
                    props.handleColumnOrder(dragIndex, hoverIndex);
                }
                break;
            }
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
    },
    
    canDrop(props, monitor)
    {
        const tItem = monitor.getItem();

        const dragIndex = tItem.index;
        const hoverIndex = props.index;

        if (monitor.getItemType() === "CARD") {
            return dragIndex != hoverIndex && props.tableUuid === tItem.tableUuid;
        }

        return true;
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
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
        itemType: monitor.getItemType()
    };
};

@DropTarget(["CARD", DND_RESIZER], specTarget, collectTarget)
@DragSource("CARD", specSource, collectSource)
class Column extends Component {

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
            sortDirection
        } = this.props;

        const {
            isOver,
            canDrop,
            connectDragSource,
            connectDropTarget,
            itemType
        } = this.props;

        const showSortIndicator = sortBy === dataKey;

        return connectDragSource(connectDropTarget(
            <div className={itemType === "CARD" && canDrop && isOver && stylesGrid["active"]}>
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
    Column
};
