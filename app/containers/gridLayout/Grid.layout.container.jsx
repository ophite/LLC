import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GridLayoutPage } from '../../components/pages/gridLayout/Grid.layout.page';
import { deleteLayout } from '../../actions/layout.actions';


class GridLayoutContainer extends React.Component {

    render() {
        return (
            <div>
                <GridLayoutPage
                    {...this.props}
                />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        layout: state.layout.layout,
        layouts: state.layout.layouts,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleDeleteLayout: bindActionCreators(deleteLayout, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridLayoutContainer);



