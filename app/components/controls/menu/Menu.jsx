import React from 'react';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import styles from '../../../assets/styles/components/menu-top.scss';
import { addWindow } from '../../../containers/layouts/Golden.container.jsx';


const menu = {
    file: 'file',
    subjects: 'subjects',
    table: 'table',
    table2: 'table',
    custom: 'custom',
    individual: 'individual'
};


class MenuComponent extends React.Component {

    handleSelect = (info) => {
        switch (info.key) {
            case menu.table:
            case menu.table2:
            {
                addWindow('Таблица', 'table');
                break;
            }
            case menu.individual:
            {
                addWindow('Физлицо', 'individual');
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
                    onSelect={this.handleSelect}
                    className={styles["menu-top"]}
                >
                    <MenuItem key={menu.file}>Файл</MenuItem>
                    <SubMenu key={menu.subjects} title={directoryTitleView}>
                        <MenuItem key={menu.table2}>Таблица</MenuItem>
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
