import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { DragLayer } from 'react-dnd';

import stylesGrid from "../../../../assets/styles/components/react-grid.scss";
import SortIndicator from './SortIndicator'
import {
    ColumnResizer,
    ColumnResizerComponent,
    ColumnDragResizerComponent
} from './ColumnResizer';
import './ColumnResizer.css';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';
import { getEmptyImage } from 'react-dnd-html5-backend';


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
        const itemType = monitor.getItemType();
        if (!item) {
            return
        }

        switch (itemType) {
            case "CARD" :
            {
                const dragIndex = item.index;
                const hoverIndex = props.index;
                if (dragIndex != hoverIndex) {
                    props.handleColumnOrder(dragIndex, hoverIndex);
                }
                break;
            }
            case "RESIZER":
            {
                const initialOffset = monitor.getInitialSourceClientOffset();
                const currentOffset = monitor.getSourceClientOffset();
                // debugger
                const deltaWidth = currentOffset.x - initialOffset.x;
                const dragIndex = item.index;
                const hoverIndex = props.index;
                // if (dragIndex != hoverIndex) {
                props.handleColumnResize(dragIndex, hoverIndex, deltaWidth);
                // }
                break;
            }
            default:
            {
                break;
            }
        }
    },
    canDrop(props, monitor) {
        const tItem = monitor.getItem();

        const dragIndex = tItem.index;
        const hoverIndex = props.index;

        if (monitor.getItemType() === "CARD") {
            return dragIndex != hoverIndex;
        }

        return true;
        // return /*monitor.getItemType() === "CARD" && */dragIndex != hoverIndex;
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

@DropTarget(["CARD", "RESIZER"], specTarget, collectTarget)
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

function getItemStylesColumn(boundingClientRect, props) {
    const { initialOffset, currentOffset, headerHeight, differenceFromInitialOffset } = props;
    if (!initialOffset || !currentOffset || !boundingClientRect) {
        return {
            display: 'none'
        };
    }

    let { x, y } = currentOffset;
    // console.log('initialOffset:', initialOffset)
    // console.log('currentOffset:', currentOffset)
    // console.log('boundingClientRect:', boundingClientRect)
    const { left, top, width, height } = boundingClientRect;
    x = x - left //+ width / 2;
    y = y - top //+ height / 2;
    x = differenceFromInitialOffset.x; // TODO add offset by X (left)
    y = differenceFromInitialOffset.y + height / 2;

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform: transform,
        WebkitTransform: transform
    };
}

function getItemStyles(boundingClientRect, props) {
    const {
        initialOffset,
        currentOffset,
        clientOffset,
        differenceFromInitialOffset,
        initialClientOffset,
        width
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
}

const layerStyles = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 122100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
};


const collectDragLayer = (monitor) => {
    return {
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        clientOffset: monitor.getClientOffset(),
        differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
        initialClientOffset: monitor.getInitialClientOffset(),
        isDragging: monitor.isDragging()
    };
};


@DragLayer(collectDragLayer)
class HeaderDragLayout extends Component {

    state = {
        boundingClientRect: null
    };

    componentDidUpdate(prevProps, prevState) {
        const { boundingClientRect } = this.state;
        if (!boundingClientRect) {
            const element = ReactDOM.findDOMNode(this._ref);
            if (!element) {
                return;
            }

            const { itemType, isDragging, item, index, label } = this.props;
            let node = null;
            if (itemType === 'RESIZER') {
                node = element.parentElement;
            }

            if (itemType === 'CARD') {
                node = element;
            }

            var rect = node.getBoundingClientRect();
            this.setState({
                boundingClientRect: rect
            });
        }
    }

    renderResizer = () => {
        const { height } = this.props;
        return (
            <div ref={(ref) => this._ref = ref} style={layerStyles}>
                <div style={getItemStyles(this.state.boundingClientRect, this.props)}>
                    <ColumnResizerComponent
                        height={height}
                    />
                </div>
            </div>
        );
    };

    render() {
        const { itemType, isDragging, item, index, label } = this.props;
        if (!isDragging) {
            return (
                null
            );
        }

        if (itemType === 'RESIZER' && item.index === index) {
            return this.renderResizer();
        }

        if (itemType === 'CARD' && item.index === index) {
            return (
                <div ref={(ref) => this._ref = ref} style={layerStyles}>
                    <div style={getItemStylesColumn(this.state.boundingClientRect, this.props)}>
                        <span
                            className='ReactVirtualized__Table__headerTruncatedText'
                            key='label'
                            title={label}
                        >
                {label}
                </span>
                    </div>
                </div>
            );
        }

        return (
            null
        );
    }
}


class Header extends Component {

    renderColumn = () => {
        const {
            dataKey,
            label,
            sortBy,
            sortDirection,
            index,
            headerHeight,
            handleColumnOrder,
            handleColumnResize
        } = this.props;

        return (
            <Column
                dataKey={dataKey}
                label={label}
                sortBy={sortBy}
                sortDirection={sortDirection}
                index={index}
                headerHeight={headerHeight}
                handleColumnOrder={handleColumnOrder}
                handleColumnResize={handleColumnResize}
            />
        );
    };

    renderResizer = () => {
        const {
            headerHeight,
            index
        } = this.props;

        console.log('this.props', this.props)

        return (
            <ColumnResizer
                height={headerHeight}
                index={index}
            />
        );
    };

    renderDragLayer = () => {
        return (
            <HeaderDragLayout {...this.props}/>
        );
    };

    render() {
        const { last } = this.props;

        return (
            <div>
                {this.renderColumn()}
                {this.renderDragLayer()}
                {!last && this.renderResizer()}
            </div>
        );
    }
}

export {
    Header
};
