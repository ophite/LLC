import React from 'react';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import styles from '../../../assets/styles/components/menu-top.scss';
import { addLayout as addLayoutToGolden } from '../goldenLayout/golden.init';
import { layouts } from '../../../constants/menu.constant';

const menu = {
    file: 'file',
    subjects: 'subjects',
    table: 'table',
    tableVirtual: 'tableVirtual',
    custom: 'custom',
    individual: 'individual'
};


class MenuComponent extends React.Component {

    handleSelect = (info) => {
        const { handleAddLayout } = this.props;

        switch (info.key) {
            case menu.table:
            {
                addLayoutToGolden(layouts.table);
                handleAddLayout(layouts.table);
                break;
            }
            case menu.tableVirtual:
            {
                addLayoutToGolden(layouts.virtulized);
                handleAddLayout(layouts.virtulized);
                break;
            }
            case menu.individual:
            {
                addLayoutToGolden(layouts.individual);
                handleAddLayout(layouts.individual);
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
                    <MenuItem key={menu.individual}>Individual</MenuItem>
                    <MenuItem key={menu.table}>Table (data grid)</MenuItem>
                    <SubMenu key={menu.subjects} title={directoryTitleView}>
                        <MenuItem key={menu.table}>Table (data grid)</MenuItem>
                        <MenuItem key={menu.tableVirtual}>Table (virtualized)</MenuItem>
                        <SubMenu key={menu.custom} title={subjectsTitleView}>
                            <MenuItem key={menu.individual}>Individual</MenuItem>
                            <MenuItem key={menu.table}>Table (data grid)</MenuItem>
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
