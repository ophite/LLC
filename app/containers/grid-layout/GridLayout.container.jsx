import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GridLayoutComponent } from '../../components/pages/grid-layout/GridLayoutComponent';


class GridLayoutComponentContainer extends React.Component {

    state = { layout: [] };

    onLayoutChange = (layout) => {
        this.setState({ layout: layout });
    };

    stringifyLayout() {
        return this.state.layout.map(function (l) {
            return (
                <div className="layoutItem" key={l.i}>
                   <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="layoutJSON">
                    Displayed as <code>[x, y, w, h]</code>:
                    <div className="columns">
                        {this.stringifyLayout()}
                    </div>
                </div>
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



