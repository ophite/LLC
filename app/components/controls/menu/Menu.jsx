import React from 'react';
import ReactDOM from 'react-dom';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import 'rc-menu/assets/index.css';

function handleSelect(info) {
    console.log('selected ', info);
}

function handleDeselect(info) {
    console.log('deselect ', info);
}

const titleRight = (<span>sub menu
  <i className="fa fa-caret-right pull-right"></i>
</span>);
const titleRight1 = (<span>sub menu 1
  <i className="fa fa-caret-right pull-right"></i>
</span>);
const titleRight2 = (<span>sub menu 2
  <i className="fa fa-caret-right pull-right"></i>
</span>);
const titleRight3 = (<span>sub menu 3
  <i className="fa fa-caret-right pull-right"></i>
</span>);


class MenuComponent extends React.Component {

    render() {
        const leftMenu = (
            <Menu
                mode="horizontal"
                multiple
                onSelect={handleSelect}
                onDeselect={handleDeselect}
                defaultSelectedKeys={['2', '1-1']}
            >
                <SubMenu title={titleRight} key="1">
                    <MenuItem key="1-1">0-1</MenuItem>
                    <MenuItem key="1-2">0-2</MenuItem>
                </SubMenu>
                <MenuItem key="2" disabled>can not deselect me,i'm disabled</MenuItem>
                <MenuItem key="3">outer</MenuItem>
                <SubMenu title={titleRight1} key="4">
                    <MenuItem key="4-1">inner inner</MenuItem>
                    <Divider />
                    <SubMenu
                        key="4-2"
                        title={titleRight2}
                    >
                        <MenuItem key="4-2-1">inn</MenuItem>
                        <SubMenu title={titleRight3} key="4-2-2">
                            <MenuItem key="4-2-2-1">inner inner</MenuItem>
                            <MenuItem key="4-2-2-2">inner inner2</MenuItem>
                        </SubMenu>
                    </SubMenu>
                </SubMenu>
                <MenuItem disabled key="disabled">disabled</MenuItem>
                <MenuItem key="4-3">outer3</MenuItem>
            </Menu>
        );

        return (
            <div>
                <link href="//cdn.bootcss.com/font-awesome/4.2.0/css/font-awesome.css" rel="stylesheet"/>
                {leftMenu}
            </div>);
    }
}

export default MenuComponent;
