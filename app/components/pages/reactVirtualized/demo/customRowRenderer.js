/** @flow */
import React from 'react'

/**
 * Default row renderer for Table.
 */
export default function defaultRowRenderer ({
  className,
  columns,
  index,
  isScrolling,
  key,
  onRowClick,
  onRowDoubleClick,
  onRowMouseOver,
  onRowMouseOut,
  rowData,
  style
}) {
  const a11yProps = {}

  if (
    onRowClick ||
    onRowDoubleClick ||
    onRowMouseOver ||
    onRowMouseOut
  ) {
    a11yProps['aria-label'] = 'row'
    a11yProps.role = 'row'
    a11yProps.tabIndex = 0

    if (onRowClick) {
      a11yProps.onClick = () => onRowClick({ index })
    }
    if (onRowDoubleClick) {
      a11yProps.onDoubleClick = () => onRowDoubleClick({ index })
    }
    if (onRowMouseOut) {
      a11yProps.onMouseOut = () => onRowMouseOut({ index })
    }
    if (onRowMouseOver) {
      a11yProps.onMouseOver = () => onRowMouseOver({ index })
    }
  }

  if(rowData && rowData.sysMeta){
    var padSpanStyle = {width: rowData.sysMeta.level * 10 + 'px;'};
    var padSpan = (<span style={padSpanStyle}></span>);
  
    var collapsedSpan = rowData.sysMeta.collapsed  
        ? (<span>[+]</span>)
        : (<span>[-]</span>);
 
    var toggleRowFunction = function(){
        if(onRowClick){
            onRowClick(rowData);
        }
    }
 
      return (
        <div
          {...a11yProps}
          className={className}
          key={key}
          style={style}
          onClick={toggleRowFunction}
        >
           {padSpan} {collapsedSpan} {rowData.name}
        </div>
      )
  }
  
  return (
    <div
      {...a11yProps}
      className={className}
      key={key}
      style={style}
    >
      {columns}
    </div>
  )
}
