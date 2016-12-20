import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { DragSource, DropTarget, DragLayer } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { ColumnResizer } from '../../../controls/columnResizer/ColumnResizer';
import { DND_RESIZER } from '../../../controls/columnResizer/ColumnResizer.constants';
import { DND_COLUMN } from '../column/Column.constants'

function getItemStylesColumn(boundingClientRect, props) {
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
}

function getItemStyles(boundingClientRect, props) {
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
class HeaderDragLayer extends Component {

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
            if (itemType === DND_RESIZER) {
                node = element.parentElement;
            }

            if (itemType === DND_COLUMN) {
                node = element;
            }

            var rect = node.getBoundingClientRect();
            this.setState({
                boundingClientRect: rect
            });
        }
    }

    renderColumnResizer = () => {
        const {
            height,
            item,
            index,
            tableUuid
        } = this.props;

        if (item.index === index && item.tableUuid === tableUuid) {
            return (
                <div ref={(ref) => this._ref = ref} style={layerStyles}>
                    <div style={getItemStyles(this.state.boundingClientRect, this.props)}>
                        <ColumnResizer
                            height={height}
                        />
                    </div>
                </div>
            );
        }

        return (null);
    };

    renderColumn = () => {
        const {
            item,
            index,
            label,
            tableUuid
        } = this.props;

        if (item.index === index && item.tableUuid === tableUuid) {
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

        return (null);
    };

    render() {
        const { itemType, isDragging } = this.props;
        if (!isDragging) {
            return (
                null
            );
        }

        switch (itemType) {
            case DND_RESIZER :
            {
                return this.renderColumnResizer();
            }
            case DND_COLUMN :
            {
                return this.renderColumn();
            }

            default:
            {
                return (null);
            }
        }
    }
}


export {
    HeaderDragLayer
};
