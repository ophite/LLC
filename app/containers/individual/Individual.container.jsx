import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InvidualPage from '../../components/pages/individual/Individual.page.jsx';
import uuid from 'uuid';


class IndividualContainer extends React.Component {

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
            <InvidualPage
                {...this.props}
                uuid={this.state.uuid}
            />
        );
    }
}

IndividualContainer.propTypes = {};

const mapStateToProps = (state) => {
    return {
        uuid: state.common.goldenWindowUuid,
        goldenWindowUuidTst: state.common.goldenWindowUuidTst
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualContainer);



