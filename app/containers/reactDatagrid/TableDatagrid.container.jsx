import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TablePage from '../../components/pages/reactDatagrid/TableDataGrid.page.jsx';
import GoldenLayoutContainer from '../goldenLayout/Golden.layout.container.jsx';


class TableContainer extends GoldenLayoutContainer {

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



