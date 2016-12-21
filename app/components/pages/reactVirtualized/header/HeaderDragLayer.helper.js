const getColumnStyles = (boundingClientRect, props) => {
    const { initialOffset, currentOffset, differenceFromInitialOffset } = props;
    if (!initialOffset || !currentOffset || !boundingClientRect) {
        return {
            display: 'none'
        };
    }

    let { x, y } = currentOffset;
    const { height } = boundingClientRect;
    x = differenceFromInitialOffset.x; // TODO add offset by X (left)
    y = differenceFromInitialOffset.y + height / 2;

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform: transform,
        WebkitTransform: transform
    };
};


const getColumnResizerStyles = (boundingClientRect, props) => {
    const {
        initialOffset,
        currentOffset,
        differenceFromInitialOffset,
    } = props;

    if (!initialOffset || !currentOffset || !boundingClientRect) {
        return {
            display: 'none'
        };
    }

    let { x, y } = currentOffset;
    x = differenceFromInitialOffset.x;
    y = 0;

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform: transform,
        WebkitTransform: transform
    };
};

const layerStyles = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 122100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
};


export {
    layerStyles,
    getColumnStyles,
    getColumnResizerStyles
};
