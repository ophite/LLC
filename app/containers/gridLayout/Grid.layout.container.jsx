import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GridLayoutPage } from '../../components/pages/gridLayout/Grid.layout.page';


class GridLayoutComponentContainer extends React.Component {

    state = { layout: [] };

    onLayoutChange = (layout) => {
        this.setState({ layout: layout });
    };

    render() {
        return (
            <div>
                <GridLayoutPage
                    {...this.props}
                    onLayoutChange={this.onLayoutChange}
                />
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



