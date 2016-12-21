import { DND_COLUMN } from '../../pages/reactVirtualized/column/Column.constants';


const specificationsTarget = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        if (!item) {
            return
        }

        const dragIndex = item.index;
        // const hoverIndex = props.index;
        if (item.tableUuid === props.tableUuid) {
            props.handleOnColumnGrouping(dragIndex);
        }
    },

    canDrop(props, monitor)
    {
        const tItem = monitor.getItem();
        if (monitor.getItemType() === DND_COLUMN) {
            return props.tableUuid === tItem.tableUuid;
        }

        return true;
    }
};

const propsTarget = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
};

export {
    specificationsTarget,
    propsTarget
}
