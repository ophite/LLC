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
    var padLeftStyle = {marginLeft: rowData.sysMeta.level * 20 + 'px'};
  
    var collapsedSpan = rowData.sysMeta.collapsed  
        ? (<span style={padLeftStyle} className="row-pointer">+</span>)
        : (<span style={padLeftStyle} className="row-pointer">-</span>);
 
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
           {collapsedSpan} {rowData.name}
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
