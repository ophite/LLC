import React, { Component, PropTypes } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import shouldPureComponentUpdate from '../../../utils/react/shouldPureComponentUpdate';
import { ColumnResizer } from './ColumnResizer'
import { DND_RESIZER } from './ColumnResizer.constants';
import { specificationsSource, propsSource } from './ColumnResizer.dnd';


@DragSource(DND_RESIZER, specificationsSource, propsSource)
class ColumnResizerContainer extends Component {

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
        const { connectDragSource, height } = this.props;
        return connectDragSource(
            <div>
                <ColumnResizer
                    height={height}
                />
            </div>
        );
    }
}

ColumnResizerContainer.PropTypes = {
    height: PropTypes.number.isRequired
};

export {
    ColumnResizerContainer,
};
