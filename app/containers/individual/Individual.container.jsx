import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InvidualPage from '../../components/pages/individual/Individual.page.jsx';
import GoldenContainer from '../goldenLayout/GoldenLayout.container.jsx';


class IndividualContainer extends GoldenContainer {
    render() {
        return (
            <InvidualPage
                {...this.props}
                uuid={this.stateProps ? this.stateProps.uuid : null}
            />
        );
    }
}

IndividualContainer.propTypes = {};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualContainer);



