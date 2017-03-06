import React from 'react';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import styles from '../../../assets/styles/components/menu-top.scss';
import { layouts } from '../../../constants/menu.constant';

const menu = {
    file: 'file',
    subjects: 'subjects',
    tableVirtual: 'tableVirtual',
    custom: 'custom',
    individualReactToolbox: 'individualReactToolbox',
    individualAntdesign: 'individualAntdesign'
};


class MenuComponent extends React.Component {

    handleSelect = (info) => {
        const { handleAddLayout } = this.props;

        switch (info.key) {
            case menu.tableVirtual:
            {
                handleAddLayout(layouts.virtulized);
                break;
            }
            case menu.individualReactToolbox:
            {
                handleAddLayout(layouts.individualReactToolbox);
                break;
            }
            case menu.individualAntdesign:
            {
                handleAddLayout(layouts.individualAntdesign);
                break;
            }
            default:
            {
            }
        }
    };

    render() {
        const directoryTitleView = (
            <span>
                Directories
                <i className="fa fa-caret-right pull-right"/>
            </span>
        );
        const subjectsTitleView = (
            <span>
                Subjects
                <i className="fa fa-caret-right pull-right"/>
            </span>
        );

        return (
            <div>
                <link href="//cdn.bootcss.com/font-awesome/4.2.0/css/font-awesome.css" rel="stylesheet"/>
                <Menu
                    multiple
                    mode="horizontal"
                    onClick={this.handleSelect}
                    className={styles["menu-top"]}
                >
                    <MenuItem key={menu.file}>File</MenuItem>
                    <MenuItem key={menu.individualReactToolbox}>Individual (react toolbox)</MenuItem>
                    <MenuItem key={menu.individualAntdesign}>Individual (antdesign)</MenuItem>
                    <SubMenu key={menu.subjects} title={directoryTitleView}>
                        <MenuItem key={menu.tableVirtual}>Table (virtualized)</MenuItem>
                        <SubMenu key={menu.custom} title={subjectsTitleView}>
                            <MenuItem key={menu.individualAntdesign}>Individual (antdesign)</MenuItem>
                            <MenuItem key={menu.individualReactToolbox}>Individual (react toolbox)</MenuItem>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

MenuComponent.propTypes = {
    handleAddLayout: React.PropTypes.func.isRequired,
};
export default MenuComponent;
