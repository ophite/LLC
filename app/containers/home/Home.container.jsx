import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomePage from '../../components/pages/home/Home.page.jsx';


class HomeContainer extends React.Component {

    render() {
        return (
            <HomePage
            />
        );
    }
}

HomeContainer.propTypes = {};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);



