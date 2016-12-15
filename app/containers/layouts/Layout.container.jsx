import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeModal } from '../../actions/modal.actions';
import LayoutPage from '../../components/pages/layouts/Layout.page.jsx';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';


@DragDropContext(HTML5Backend)
class LayoutContainer extends React.Component {

    handleKeyDown(e) {
        const { isModalOpen, handleCloseModal } = this.props;

        if (e.keyCode === '27' && isModalOpen) {
            handleCloseModal();
        }
    }

    render() {
        return (
            <LayoutPage
                {...this.props}
                {...this.state}
                handleKeyDown={this.handleKeyDown.bind(this)}
            />
        );
    }
}

LayoutContainer.propTypes = {
    isModalOpen: React.PropTypes.bool,
    handleCloseModal: React.PropTypes.func,
};

const mapStateToProps = (state) => ({
    isModalOpen: state.common.isModalOpen,
});

const mapDispatchToProps = (dispatch) => ({
    handleCloseModal: bindActionCreators(closeModal, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
