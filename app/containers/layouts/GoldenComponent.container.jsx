import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uuid from 'uuid';


class GoldenComponentContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uuid: uuid(),
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.uuid === this.props.uuid && this.props.goldenWindowUuidTst !== prevProps.goldenWindowUuidTst) {
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div></div>
        );
    }
}

GoldenComponentContainer.propTypes = {};

const mapStateToProps = (state) => {
    return {
        uuid: state.common.goldenWindowUuid,
        goldenWindowUuidTst: state.common.goldenWindowUuidTst
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GoldenComponentContainer);



