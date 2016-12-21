const endDragResizer = (props, monitor) => {
    const item = monitor.getItem();
    const initialOffset = monitor.getInitialSourceClientOffset();
    const currentOffset = monitor.getSourceClientOffset();
    const deltaWidth = currentOffset.x - initialOffset.x;
    const dragIndex = item.index;
    const hoverIndex = props.index;

    if (props.tableUuid === item.tableUuid) {
        props.handleColumnResize(dragIndex, hoverIndex, deltaWidth);
    }
};


export {
    endDragResizer,
};
