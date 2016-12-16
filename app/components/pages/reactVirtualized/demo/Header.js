import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { DragLayer } from 'react-dnd';

import stylesGrid from "../../../../assets/styles/components/react-grid.scss";
import SortIndicator from './SortIndicator'
import { ColumnResizer } from './ColumnResizer';
import './ColumnResizer.css';


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
        if (!item) {
            return
        }
        const dragIndex = item.index;
        const hoverIndex = props.index;
        if (dragIndex != hoverIndex) {
            props.handleColumnOrder(dragIndex, hoverIndex);
        }
    },
    canDrop(props, monitor) {
        const tItem = monitor.getItem();
        const dragIndex = tItem.index;
        const hoverIndex = props.index;

        return dragIndex != hoverIndex;
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
        isDragging: monitor.isDragging()
    };
};

@DropTarget(["CARD", "RESIZER"], specTarget, collectTarget)
@DragSource("CARD", specSource, collectSource)
class Column extends Component {
    render() {
        const {
            columnData,
            dataKey,
            disableSort,
            label,
            sortBy,
            sortDirection
        } = this.props;

        const { isOver, canDrop, connectDragSource, connectDropTarget } = this.props;
        const showSortIndicator = sortBy === dataKey;

        return connectDragSource(connectDropTarget(
            <div className={canDrop && isOver && stylesGrid["active"]}>
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

function getItemStyles(boundingClientRect, props) {
    const {
        initialOffset,
        currentOffset,
        clientOffset,
        differenceFromInitialOffset,
        initialClientOffset
    } = props;

    if (!initialOffset || !currentOffset || !boundingClientRect) {
        return {
            display: 'none'
        }
    }

    let { x, y } = currentOffset;
    y = initialOffset.y;
    x = x - boundingClientRect.left;
    y = y - boundingClientRect.top;

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform: transform,
        WebkitTransform: transform
    }
}

const layerStyles = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 122100,
    left: 0, //-55,
    top: 0, //-130,
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
            const element = ReactDOM.findDOMNode(this.goldenWindow);
            if (!element) {
                return;
            }

            var rect = element.getBoundingClientRect();
            this.setState({
                boundingClientRect: rect
            });
        }
    }

    renderColumn = () => {
        return (
            <Column {...this.props}/>
        );
    };

    renderResizer = () => {
        return (
            <ColumnResizer height={this.props.height}/>
        );
    };

    render() {
        const { itemType, isDragging, height } = this.props
        if (!isDragging) {
            return (
                null
            );
        }

        // debugger
        if (itemType === 'RESIZER') {
            return (
                <div ref={(ref) => this.goldenWindow = ref} style={layerStyles}>
                    <div style={getItemStyles(this.state.boundingClientRect, this.props)}>
                        <div className="vertical-line" style={{height:50}}>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            null
        );
    }
}


const layerStylesHeader = {
    // position: 'relative',
    // zIndex: 110022,
    // left: 0, //-55,
    // top: 0, //-130,
    // width: '100%',
    // height: '100%'
};


class Header extends Component {

    renderColumn = () => {
        return (
            <Column {...this.props}/>
        );
    };

    renderResizer = () => {
        return (
            <ColumnResizer height={this.props.height}/>
        );
    };

    renderDragLayer = () => {
        return (
            <HeaderDragLayout/>
        );
    };

    render() {
        return (
            <div>
                <div style={layerStylesHeader}>
                    {this.renderColumn()}
                    {this.renderResizer()}
                    {this.renderDragLayer()}
                </div>
            </div>
        );
    }
}

export {
    Header
};
