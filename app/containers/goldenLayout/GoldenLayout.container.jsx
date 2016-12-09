import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uuid from 'uuid';


class GoldenComponentContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uuid: uuid()
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { uuid, goldenWindowUuidTst } = this.props;
        if (prevState.uuid === uuid &&
            prevProps.goldenWindowUuidTst !== goldenWindowUuidTst) {
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div>
            </div>
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



