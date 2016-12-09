import React from 'react';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import styles from '../../../assets/styles/components/menu-top.scss';
import { addWindow } from '../golden/GoldenInit';
// import { addWindow } from '../../../containers/golden/GoldenInit';
import { windows } from '../../../constants/menu.constant';

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
        switch (info.key) {
            case menu.table:
            {
                addWindow(windows.table);
                break;
            }
            case menu.tableVirtual:
            {
                addWindow(windows.virtulized);
                break;
            }
            case menu.individual:
            {
                addWindow(windows.individual);
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
                Справочники
                <i className="fa fa-caret-right pull-right"/>
            </span>
        );
        const subjectsTitleView = (
            <span>
                Контрагенты
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
                    <MenuItem key={menu.file}>Файл</MenuItem>
                    <MenuItem key={menu.individual}>Физлицо</MenuItem>
                    <MenuItem key={menu.table}>Таблица</MenuItem>
                    <SubMenu key={menu.subjects} title={directoryTitleView}>
                        <MenuItem key={menu.table}>Таблица</MenuItem>
                        <MenuItem key={menu.tableVirtual}>Таблица virt</MenuItem>
                        <SubMenu key={menu.custom} title={subjectsTitleView}>
                            <MenuItem key={menu.individual}>Физлицо</MenuItem>
                            <MenuItem key={menu.table}>Таблица</MenuItem>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default MenuComponent;
