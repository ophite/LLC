import React, { Component, PropTypes } from 'react'
import { DragSource, DropTarget, DragLayer } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { DND_COLUMN } from './Column.constants';
import { DND_RESIZER } from '../../../controls/columnResizer/ColumnResizer.constants';
import { endDragResizer } from '../../../controls/columnResizer/ColumnResizer.helper';


const specificationsSource = {
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

const propsSource = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
        itemType: monitor.getItemType()
    };
};

const specificationsTarget = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        const itemType = monitor.getItemType();
        if (!item) {
            return
        }

        switch (itemType) {
            case DND_COLUMN:
            {
                const dragIndex = item.index;
                const hoverIndex = props.index;
                if (dragIndex != hoverIndex && props.tableUuid === item.tableUuid) {
                    props.handleColumnOrder(dragIndex, hoverIndex);
                }
                break;
            }
            case DND_RESIZER:
            {
                endDragResizer(props, monitor);
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

        if (monitor.getItemType() === DND_COLUMN) {
            return dragIndex != hoverIndex && props.tableUuid === tItem.tableUuid;
        }

        return true;
    }
};


const propsTarget = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    };
};


export {
    specificationsSource,
    propsSource,
    specificationsTarget,
    propsTarget
};
