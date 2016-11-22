import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GridPage from '../../components/pages/react-datagrid/Grid.page.jsx';


class GridContainer extends React.Component {

    render() {
        const { pokemons } = this.props;

        return (
            <GridPage
            />
        );
    }
}

GridContainer.propTypes = {
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);



