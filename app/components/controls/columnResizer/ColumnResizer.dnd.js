import { DND_COLUMN_RESIZER } from './ColumnResizer.constants';
import { endDragResizer } from './ColumnResizer.helper';

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
            case DND_COLUMN_RESIZER:
            {
                endDragResizer(props, monitor);
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
