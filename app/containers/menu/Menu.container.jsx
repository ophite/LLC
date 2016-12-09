import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Menu from '../../components/controls/menu/Menu.jsx';
import { addLayout } from '../../actions/layout.actions';

class MenuContainer extends React.Component {
    render() {
        return (
            <Menu
                {...this.props}
            />
        );
    }
}


MenuContainer.propTypes = {};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleAddLayout: bindActionCreators(addLayout, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
