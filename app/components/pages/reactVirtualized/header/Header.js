import React, { Component, PropTypes } from 'react'
import { DragSource, DropTarget, DragLayer } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { Column } from '../column/Column';
import { HeaderDragLayer } from './HeaderDragLayer';
import { ColumnResizerContainer as ColumnResizer } from '../../../controls/columnResizer/ColumnResizer.container';


class Header extends Component {

    renderColumn = () => {
        const {
            dataKey,
            label,
            sortBy,
            sortDirection,
            index,
            handleColumnOrder,
            handleColumnResize,
            handleFilter,
            isFilterVisible,
            filterConfig,
            tableUuid,
        } = this.props;

        return (
            <Column
                dataKey={dataKey}
                label={label}
                sortBy={sortBy}
                sortDirection={sortDirection}
                index={index}
                handleColumnOrder={handleColumnOrder}
                handleColumnResize={handleColumnResize}
                handleFilter={handleFilter}
                isFilterVisible={isFilterVisible}
                filterConfig={filterConfig}
                tableUuid={tableUuid}
            />
        );
    };

    renderHeaderDragLayer = () => {
        return (
            <HeaderDragLayer {...this.props}/>
        );
    };

    renderColumnResizer = () => {
        const {
            index,
            headerHeight,
            tableUuid,
            handleColumnResize
        } = this.props;

        return (
            <ColumnResizer
                height={headerHeight}
                index={index}
                tableUuid={tableUuid}
                handleColumnResize={handleColumnResize}
            />
        );
    };

    render() {
        const { last } = this.props;

        return (
            <div>
                {this.renderColumn()}
                {this.renderHeaderDragLayer()}
                {!last && this.renderColumnResizer()}
            </div>
        );
    }
}

export {
    Header
};
