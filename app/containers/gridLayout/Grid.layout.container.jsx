import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GridLayoutPage } from '../../components/pages/gridLayout/Grid.layout.page';
import { deleteLayout, changeBreakpoint, saveLayout } from '../../actions/layout.actions';


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
        layoutProps: state.layout.layoutProps,
        stateBreakpoint: state.layout.breakpoint,
        stateLayout: state.layout.layout,
        stateLayouts: state.layout.layouts,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleDeleteLayout: bindActionCreators(deleteLayout, dispatch),
        handleChangeBreakpoint: bindActionCreators(changeBreakpoint, dispatch),
        handleSaveLayout: bindActionCreators(saveLayout, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridLayoutContainer);



