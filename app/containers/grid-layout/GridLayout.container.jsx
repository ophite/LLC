import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GridLayoutComponent } from '../../components/pages/grid-layout/GridLayoutComponent';


class GridLayoutComponentContainer extends React.Component {

    state = { layout: [] };

    onLayoutChange = (layout) => {
        this.setState({ layout: layout });
    };

    render() {
        return (
            <div>
                <GridLayoutComponent
                    {...this.props}
                    onLayoutChange={this.onLayoutChange}/>
            </div>
        );
    }
}


GridLayoutComponentContainer.propTypes = {};
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GridLayoutComponentContainer);



