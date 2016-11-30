import React, { Component, PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import {
    Table,
    Column,
    defaultRowRenderer,
    defaultHeaderRenderer
} from 'react-virtualized/source/Table'
import {
    AutoSizer,
} from 'react-virtualized/source/AutoSizer'
import Immutable from 'immutable'

import SortDirection from './SortDirection'
import SortIndicator from './SortIndicator'

import './styles.css';
import styles from './Table.example.css'
import { GroupingColumnsBox } from '../../react-datagrid/GroupingColumnsBox/GroupingColumnsBox.jsx';
import { DragSource, DropTarget } from 'react-dnd';
import stylesGrid from "../../../../assets/styles/components/react-grid.scss";


const cardSource = {
    beginDrag(props) {
        console.log('cardSource.beginDrag: ' + JSON.stringify(props));
        return {
            id: props.id,
            index: props.index
        };
    },

    canDrag: function (props) {
        console.log('cardSource.canDrag: ' + JSON.stringify(props));
        // You can disallow drag based on props
        return true;
    },

    // isDragging: function (props, monitor) {
    //     // If your component gets unmounted while dragged
    //     // (like a card in Kanban board dragged between lists)
    //     // you can implement something like this to keep its
    //     // appearance dragged:
    //     return monitor.getItem().id === props.id;
    // },

    // endDrag: function (props, monitor, component) {
    //     if (!monitor.didDrop()) {
    //         // You can check whether the drop was successful
    //         // or if the drag ended but nobody handled the drop
    //         return;
    //     }
    //
    //     // When dropped on a compatible target, do something.
    //     // Read the original dragged item from getItem():
    //     var item = monitor.getItem();
    //
    //     // You may also read the drop result from the drop target
    //     // that handled the drop, if it returned an object from
    //     // its drop() method.
    //     var dropResult = monitor.getDropResult();
    //
    //     // This is a good place to call some Flux action
    //     CardActions.moveCardToList(item.id, dropResult.listId);
    // }
};

const cardTarget = {
    drop(props, monitor, component) {
        console.log('cardTarget.drop: ' + JSON.stringify(props));
        const tItem = monitor.getItem();
        if (!tItem) {
            return
        }
        const dragIndex = tItem.index;
        const hoverIndex = props.index;
        props.handleColumnOrder(dragIndex, hoverIndex);
    },
    hover(props, monitor, component) {
        // console.log('cardTarget.hover: ' + JSON.stringify(props));
        // const tItem = monitor.getItem();
        // if (!tItem) {
        //     return
        // }
        // const dragIndex = tItem.index;
        // const hoverIndex = props.index;
        //
        // // Don't replace items with themselves
        // if (dragIndex === hoverIndex) {
        //     return;
        // }
        //
        // // Determine rectangle on screen
        // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        //
        // // Get vertical middle
        // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;
        //
        //
        // // Determine mouse position
        // const clientOffset = monitor.getClientOffset();
        //
        // // Get pixels to the top
        // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        //
        // // Only perform the move when the mouse has crossed half of the items height
        // // When dragging downwards, only move when the cursor is below 50%
        // // When dragging upwards, only move when the cursor is above 50%
        //
        // // Dragging downwards
        // // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        // //     return;
        // // }
        //
        // // Dragging upwards
        // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        //     return;
        // }

        // Time to actually perform the action
        // props.handleColumnOrder(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        // monitor.getItem().index = hoverIndex;
    }
};


function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    };
}

@DropTarget("CARD", cardTarget, collect)
@DragSource("CARD", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
class HeaderRenderer extends Component {
    render() {
        const {
            columnData,
            dataKey,
            disableSort,
            label,
            sortBy,
            sortDirection
        } = this.props;

        const { isDragging, isOver, connectDragSource, connectDropTarget } = this.props;
        const showSortIndicator = sortBy === dataKey;

        return connectDragSource(connectDropTarget(
            <div className={isOver && stylesGrid["active"]}>
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

class TableExample extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            groupingColumns: [
                'firstName',
                'index',
            ],
            list: props.list,
            headerHeight: 30,
            height: 500,
            overscanRowCount: 10,
            rowHeight: 40,
            rowCount: 1000,
            sortBy: 'index',
            sortDirection: SortDirection.ASC,
            useDynamicRowHeight: false,
            // columns: [
            //     ({ index })=> {
            //         return {
            //             key: index,
            //             headerRenderer: this._headerRendererDnd.bind(this, index),
            //             label: 'Index',
            //             dataKey: 'index',
            //             cellDataGetter: ({ columnData, dataKey, rowData }) => rowData.index,
            //             disableSort: !this._isSortEnabled(),
            //             width: 60
            //         }
            //     },
            //     ({ index })=> {
            //         return {
            //             key: index,
            //             headerRenderer: this._headerRendererDnd.bind(this, index),
            //             label: 'first Name',
            //             dataKey: 'firstName',
            //             disableSort: !this._isSortEnabled(),
            //             width: 90
            //         }
            //     },
            //     ({ index })=> {
            //         return {
            //             key: index,
            //             headerRenderer: this._headerRendererDnd.bind(this, index),
            //             label: 'last Name',
            //             dataKey: 'lastName',
            //             width: 210,
            //             disableSort: true,
            //             className: styles.exampleColumn,
            //             cellRenderer: ({ cellData, columnData, dataKey, rowData, rowIndex }) => cellData,
            //             flexGrow: 1
            //         }
            //     }
            // ]
        };
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return shallowCompare(this, nextProps, nextState);
    };

    _getDatum = (list, index) => {
        const item = list.get(index % list.size);
        return item;
    };

    _getRowHeight = (params) => {
        const { index } = params;
        const { list } = this.props;
        return this._getDatum(list, index).size
    };

    _isSortEnabled = () => {
        const { list } = this.props;
        const { rowCount } = this.state;
        return rowCount <= list.size
    };

    _noRowsRenderer = () => {
        return (
            <div className={styles.noRows}>
                No rows
            </div>
        );
    };

    _rowClassName = (params) => {
        const { index } = params;
        if (index < 0) {
            return styles.headerRow
        } else {
            return index % 2 === 0 ? styles.evenRow : styles.oddRow
        }
    };

    _sort = (params) => {
        const { sortBy, sortDirection } = params;
        this.setState({ sortBy, sortDirection });
    };

    _headerRenderer = (params) => {
        return (
            <HeaderRenderer
                {...this.props}
                {...params}
            />
        )
    };

    renderTable = (width) => {
        const {
            headerHeight,
            height,
            overscanRowCount,
            rowHeight,
            rowCount,
            sortBy,
            sortDirection,
            useDynamicRowHeight,
            list
        } = this.state;

        // const { list } = this.props;
        // const sortedList = this._isSortEnabled() ?
        //     list
        //         .sortBy(item => item[sortBy])
        //         .update(
        //             list => sortDirection === SortDirection.DESC ?
        //                 list.reverse() : list
        //         ) : list;

        const rowGetter = (params) => {
            const { index } = params;
            return this._getDatum(list, index);
        };

        return (
            <Table
                ref='Table'
                disableHeader={false}
                headerClassName={styles.headerColumn}
                headerHeight={headerHeight}
                height={height}
                noRowsRenderer={this._noRowsRenderer}
                overscanRowCount={overscanRowCount}
                rowClassName={this._rowClassName}
                rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
                rowGetter={rowGetter}
                rowCount={rowCount}
                sort={this._sort}
                sortBy={sortBy}
                sortDirection={sortDirection}
                width={width}
            >
                <Column
                    dataKey='index'
                    label='Index'
                    index={1}
                    width={60}
                    headerRenderer={this._headerRenderer}
                    cellDataGetter={({ columnData, dataKey, rowData }) => rowData.index}
                    disableSort={!this._isSortEnabled()}
                />
                <Column
                    dataKey='firstName'
                    label='first Name'
                    index={2}
                    width={90}
                    headerRenderer={this._headerRenderer}
                    disableSort={!this._isSortEnabled()}
                />
                <Column
                    dataKey='lastName'
                    label='last Name'
                    index={3}
                    width={210}
                    headerRenderer={this._headerRenderer}
                    disableSort
                    className={styles.exampleColumn}
                    cellRenderer={({ cellData, columnData, dataKey, rowData, rowIndex }) => cellData}
                    flexGrow={1}
                />
            </Table>
        );
    };

    handleOnDeleteColumnGroup = (item) => {
        const index = this.state.groupingColumns.indexOf(item);
        this.setState({
            groupingColumns: [
                ...this.state.groupingColumns.slice(0, index),
                ...this.state.groupingColumns.slice(index + 1, this.state.groupingColumns.length)
            ]
        });
    };

    handleOnColumnGrouping = (index) => {
        const col = columns[index];
        let groupingColumns = [...this.state.groupingColumns];
        const groupIndex = groupingColumns.indexOf(col.name);

        if (groupIndex >= 0) {
            groupingColumns = [
                ...groupingColumns.slice(0, groupIndex),
                ...groupingColumns.slice(groupIndex + 1, groupingColumns.length)
            ];
        } else {
            groupingColumns.push(col.name);
        }

        this.setState({ groupingColumns });
    };

    render() {
        return (
            <div className={styles.Body}>
                <GroupingColumnsBox
                    handleOnDeleteColumnGroup={this.handleOnDeleteColumnGroup}
                    handleOnColumnGrouping={this.handleOnColumnGrouping}
                    groupingColumns={this.state.groupingColumns}
                />
                <div className={styles.column}>
                    <AutoSizer disableHeight>
                        {({ width }) => this.renderTable(width) }
                    </AutoSizer>
                </div>
            </div>
        );
    }
}


TableExample.PropTypes = {
    list: PropTypes.instanceOf(Immutable.List).isRequired
};

export default TableExample;
