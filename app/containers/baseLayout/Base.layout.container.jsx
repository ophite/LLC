import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uuid from 'uuid';


class BaseLayoutContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uuid: uuid()
        };
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

BaseLayoutContainer.propTypes = {};

const mapStateToProps = (state) => {
    return {
        layoutPropsSize: state.layout.layoutPropsSize, // for refresh render during resize on grid layout
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayoutContainer);



