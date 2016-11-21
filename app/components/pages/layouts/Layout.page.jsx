import ModalContainer from '../../../containers/modal/Modal.container.jsx';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import MenuComponent from '../../controls/menu/Menu.jsx';

export default class LayoutPage extends React.Component {

    renderContainerModal() {
        const {
            windowWidth,
            isContainerModalOpen,
            containerModalData,
            handleKeyDown
        } = this.props;

        if (!isContainerModalOpen) {
            return (null);
        }

        return (
            <ModalContainer
                onKeyDown={handleKeyDown}
                windowWidth={windowWidth}
                containerModalData={containerModalData}
            />
        );
    }

    renderModal() {
        const {
            modalData,
            isModalOpen,
        } = this.props;

        if (!isModalOpen) {
            return (null);
        }

        return (
            <Modal
                {...modalData}
                isOpen={true}
            />
        );
    }

    renderMenu() {

        return (
            <MenuComponent/>
        );
    }

    renderContent() {
        const {
            children
        } = this.props;
        const headerStyle = { textAlign: 'center', paddingTop: '15px' };
        // const childrenClone = React.cloneElement(children, { isMobile });

        return (
            <div>
                {children}
            </div>
        );
    }

    render() {
        return (
            <div className="wrapper">
                {this.renderMenu()}
                {this.renderContainerModal()}
                {this.renderModal()}
                {this.renderContent()}
            </div>
        );
    }
}

LayoutPage.propTypes = {
    children: React.PropTypes.element,
    windowWidth: React.PropTypes.number,
    handleKeyDown: React.PropTypes.func,
    containerModalData: React.PropTypes.object,
    isModalOpen: React.PropTypes.bool,
    isContainerModalOpen: React.PropTypes.bool,
    modalData: React.PropTypes.object
};
