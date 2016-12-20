import React from 'react';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import styles from '../../../assets/styles/components/menu-top.scss';
// import { addWindow } from '../goldenLayout/golden.init';
// import { addWindow } from '../../../containers/golden/GoldenInit';
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
                handleAddLayout({ ...layouts.table }); // TODO change to return new object
                break;
            }
            case menu.tableVirtual:
            {
                handleAddLayout({ ...layouts.virtulized });
                break;
            }
            case menu.individual:
            {
                handleAddLayout({ ...layouts.individual });
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

MenuComponent.propTypes = {
    handleAddLayout: React.PropTypes.func.isRequired,
};
export default MenuComponent;
