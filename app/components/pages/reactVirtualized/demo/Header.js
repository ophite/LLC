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
                debugger
                const deltaWidth = currentOffset.x - initialOffset.x;
                const dragIndex = item.index;
                const hoverIndex = props.index;
                if (dragIndex != hoverIndex) {
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
    canDrop(props, monitor) {
        const tItem = monitor.getItem();

        const dragIndex = tItem.index;
        const hoverIndex = props.index;

        return /*monitor.getItemType() === "CARD" && */dragIndex != hoverIndex;
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
        isDragging: monitor.isDragging(),
        itemType: monitor.getItemType()
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

        const { isOver, canDrop, connectDragSource, connectDropTarget, itemType } = this.props;
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

function getItemStyles(boundingClientRect, props) {
    const {
        initialOffset,
        currentOffset,
        width
    } = props;

    if (!initialOffset || !currentOffset || !boundingClientRect) {
        return {
            display: 'none'
        }
    }

    let { x, y } = currentOffset;
    x = x - boundingClientRect.left + width;
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

            var rect = element.parentElement.getBoundingClientRect();
            this.setState({
                boundingClientRect: rect
            });
        }
    }

    renderResizer = () => {
        return (
            <ColumnResizer height={this.props.height}/>
        );
    };

    render() {
        const { itemType, isDragging, height, item, index } = this.props;
        if (!isDragging) {
            return (
                null
            );
        }
        if (itemType === 'RESIZER' && item.index === index) {
            return (
                <div ref={(ref) => this._ref = ref} style={layerStyles}>
                    <div style={getItemStyles(this.state.boundingClientRect, this.props)}>
                        <ColumnDragResizerComponent
                            height={height}
                        />
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
        return (
            <Column {...this.props}/>
        );
    };

    renderResizer = () => {
        return (
            <ColumnResizer
                height={this.props.headerHeight}
                index={this.props.index}
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
                { !last && this.renderResizer() }
                { !last && this.renderDragLayer()}
            </div>
        );
    }
}

export {
    Header
};
