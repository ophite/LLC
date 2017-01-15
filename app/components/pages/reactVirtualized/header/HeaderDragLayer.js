import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { DragLayer } from 'react-dnd';

import { DND_COLUMN } from '../column/Column.constants'
import { DND_COLUMN_RESIZER } from '../../../controls/columnResizer/ColumnResizer.constants';
import { ColumnResizer } from '../../../controls/columnResizer/ColumnResizer';
import {
    layerStyles,
    getColumnStyles,
    getColumnResizerStyles
} from './HeaderDragLayer.helper';


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
        this._calcLayerReactangle();
    }

    _calcLayerReactangle = () => {
        const { boundingClientRect } = this.state;
        if (!boundingClientRect) {
            const element = ReactDOM.findDOMNode(this._ref);
            if (!element) {
                return;
            }

            const { itemType } = this.props;
            let node = null;

            switch (itemType) {
                case DND_COLUMN:
                {
                    node = element;
                    break;
                }
                case DND_COLUMN_RESIZER:
                {
                    node = element.parentElement;
                    break;
                }
            }

            var rect = node.getBoundingClientRect();
            this.setState({
                boundingClientRect: rect
            });
        }
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
                    <div style={getColumnStyles(this.state.boundingClientRect, this.props)}>
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

    renderColumnResizer = () => {
        const {
            height,
            item,
            index,
            tableUuid,
        } = this.props;

        if (item.index === index && item.tableUuid === tableUuid) {
            return (
                <div ref={(ref) => this._ref = ref} style={layerStyles}>
                    <div style={getColumnResizerStyles(this.state.boundingClientRect, this.props)}>
                        <ColumnResizer
                            height={height}
                        />
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
            case DND_COLUMN:
            {
                return this.renderColumn();
            }
            case DND_COLUMN_RESIZER:
            {
                return this.renderColumnResizer();
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
