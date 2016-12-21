import React, { Component, PropTypes } from 'react'
import { DragSource, DropTarget, DragLayer } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import stylesGrid from "../../../../assets/styles/components/react-grid.scss";
import SortIndicator from './SortIndicator';
import shouldPureComponentUpdate from '../../../../utils/react/shouldPureComponentUpdate';

import { DND_COLUMN } from './Column.constants';
import { DND_COLUMN_RESIZER } from '../../../controls/columnResizer/ColumnResizer.constants';
import {
    specificationsSource,
    propsSource,
    specificationsTarget,
    propsTarget
} from './Column.dnd';


@DropTarget([DND_COLUMN, DND_COLUMN_RESIZER], specificationsTarget, propsTarget)
@DragSource(DND_COLUMN, specificationsSource, propsSource)
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
        // table
        const {
            columnData,
            dataKey,
            disableSort,
            label,
            sortBy,
            sortDirection
        } = this.props;

        // dnd
        const {
            isOver,
            canDrop,
            connectDragSource,
            connectDropTarget,
            itemType
        } = this.props;

        const showSortIndicator = sortBy === dataKey;

        return connectDragSource(
            connectDropTarget(
                <div className={itemType === DND_COLUMN && canDrop && isOver && stylesGrid["active"]}>
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

export {
    Column
};
