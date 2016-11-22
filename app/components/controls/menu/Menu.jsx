import React from 'react';
import ReactDOM from 'react-dom';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
// import 'rc-menu/assets/index.css';
import '../../../assets/styles/components/menu-castomization.scss';
import styles from '../../../assets/styles/components/menu-top.scss';

function handleSelect(info) {
    console.log('selected ', info);
}

function handleDeselect(info) {
    console.log('deselect ', info);
}

const titleRight = (<span>Menu Item 1
  <i className="fa fa-caret-right pull-right"></i>
</span>);
const titleRight1 = (<span>Menu Item 3
  <i className="fa fa-caret-right pull-right"></i>
</span>);
const titleRight2 = (<span>Sub Menu Item 3.2
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
                className={styles["menu-top"]}
            >
                <SubMenu title={titleRight} key="1">
                    <MenuItem key="1-1">Menu Item 1.1</MenuItem>
                    <MenuItem key="1-2">Menu Item 1.2</MenuItem>
                </SubMenu>
                <MenuItem key="2">MenuItem 2</MenuItem>
                <MenuItem key="3">MenuItem 3</MenuItem>
                <SubMenu title={titleRight1} key="4">
                    <MenuItem key="4-1">Menu Item 3.1</MenuItem>
                    <SubMenu
                        key="4-2"
                        title={titleRight2}
                    >
                        <MenuItem key="4-2-1">Menu Item 3.2.1</MenuItem>
                        <MenuItem key="4-2-2">Menu Item 3.2.2</MenuItem>
                    </SubMenu>
                </SubMenu>
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
