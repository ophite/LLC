import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TablePage from '../../components/pages/react-virtualized/Table.page.jsx';


class TableContainer extends React.Component {

    render() {
        return (
            <TablePage
                {...this.props}
            />
        );
    }
}

TableContainer.propTypes = {};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);



