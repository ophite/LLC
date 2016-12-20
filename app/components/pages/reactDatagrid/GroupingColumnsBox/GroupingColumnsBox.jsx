import React, { PropTypes, Component } from 'react';
import 'react-datagrid/index.css';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import Chip from 'react-toolbox/lib/chip';

import styles from "../../../../assets/styles/components/react-grid.scss";
import { DND_COLUMN } from '../../reactVirtualized/column/Column.constants';


const target = {
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

@DropTarget(DND_COLUMN, target, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))
class GroupingColumnsBox extends Component {

    renderGroupingColumns = () => {
        const { groupingColumns, handleOnDeleteColumnGroup } = this.props;
        if (!groupingColumns.length) {
            return null;
        }

        const chipsView = groupingColumns.map((col, index) => {
            return (
                <Chip
                    key={index}
                    onDeleteClick={handleOnDeleteColumnGroup.bind(null, col)}
                    deletable
                    className={styles["chip-custom"]}
                >
                    {col}
                </Chip>
            )
        });

        return (
            <div>
                {chipsView}
            </div>
        );
    };

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        const className = [
            styles["section-dnd"]
        ];
        if (isActive) {
            className.push(styles["active"])
        }

        return connectDropTarget(
            <div className={className.join(' ')}>
                <h3 className={styles["title"]}>Drag columns here</h3>
                {this.renderGroupingColumns()}
            </div>
        );
    }
}

GroupingColumnsBox.PropTypes = {
    tableUuid: PropTypes.string.isRequired,
    handleOnColumnGrouping: PropTypes.func,
    handleOnDeleteColumnGroup: PropTypes.func,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    columns: PropTypes.array,
};

export {
    GroupingColumnsBox
}
