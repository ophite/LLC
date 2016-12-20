import { DND_RESIZER } from './ColumnResizer.constants';

const specificationsSource = {

    beginDrag(props, monitor) {
        return {
            id: props.id,
            index: props.index,
            tableUuid: props.tableUuid
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

        const {} = item;

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

export {
    specificationsSource,
    propsSource,
};
