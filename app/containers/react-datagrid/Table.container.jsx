import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TablePage from '../../components/pages/react-datagrid/Table.page.jsx';
import GoldenContainer from '../golden/Golden.container.jsx';


class TableContainer extends GoldenContainer {

    render() {
        return (
            <TablePage
                {...this.props}
                uuid={this.stateProps ? this.stateProps.uuid : null}
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



