import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InvidualPage from '../../components/pages/individual/Individual.page.reacttoolbox.jsx';
import GoldenLayoutContainer from '../goldenLayout/Golden.layout.container.jsx';


class IndividualContainer extends GoldenLayoutContainer {
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



