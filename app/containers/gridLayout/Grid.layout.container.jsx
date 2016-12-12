import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GridLayoutPage } from '../../components/pages/gridLayout/Grid.layout.page';
import { deleteLayout, saveLayout } from '../../actions/layout.actions';


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
        currentLayout: state.layout.currentLayout,
        allLayouts: state.layout.allLayouts
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleDeleteLayout: bindActionCreators(deleteLayout, dispatch),
        handleSaveLayout: bindActionCreators(saveLayout, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridLayoutContainer);



