import React from 'react';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './style.css';

// import PhysicalPersonEdit from '../individual/Individual.page.jsx';
// import TableVirtualized from '../../../containers/react-virtualized/Table.container.jsx';
const ResponsiveReactGridLayout = WidthProvider(Responsive);


class GridLayoutComponent extends React.Component {

    state = {
        currentBreakpoint: 'lg',
        mounted: false,
        layoutIdCounter: 0,
        layouts: this.props.initialLayouts,
    };

    componentDidUpdate(nextProps, nextState) {
        // console.log('componentDidUpdate', JSON.stringify(nextState));
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    onAddItem = () => {
        console.log('adding', 'n' + this.state.layoutIdCounter);
        this.setState({
            layouts: this.state.layouts.concat({
                i: 'n' + this.state.layoutIdCounter,
                x: this.state.layouts.length * 2 % (this.state.cols || 12),
                y: Infinity, // puts it at the bottom
                w: 2,
                h: 2
            }),
            layoutIdCounter: this.state.layoutIdCounter + 1
        });
    };

    onNewLayout = () => {
        console.log('onNewLayout');
        this.setState({
            layouts: generateLayout()
        });
    };

    onBreakpointChange = (breakpoint, cols) => {
        this.setState({
            currentBreakpoint: breakpoint,
            cols: cols
        });
    };

    onLayoutChange = (layout, layouts) => {
        this.props.onLayoutChange(layout, layouts);
        this.setState({ layout: layout });
    };

    onRemoveItem = (i) => {
        console.log('removing', i);
        this.setState({ layouts: _.reject(this.state.layouts, { i: i }) });
    };


    onWidthChange = (containerWidth, margin, cols, containerPadding) => {
        console.log('onWidthChange', containerWidth);
    };

    renderHeader() {
        return (
            <div>
                <button onClick={this.onAddItem}>Add Item</button>
                <div>
                    Current Breakpoint: {this.state.currentBreakpoint} ({this.props.cols[this.state.currentBreakpoint]}
                    columns)
                </div>
                <button onClick={this.onNewLayout}>Generate New Layout</button>
            </div>
        );
    }

    renderLayout = (el) => {
        var removeStyle = {
            position: 'absolute',
            right: '2px',
            top: 0,
            cursor: 'pointer'
        };
        var i = el.add ? '+' : el.i;
        return (
            <div key={i} data-grid={el}>
                {
                    el.add ?
                        (
                            <span
                                className="add text"
                                onClick={this.onAddItem}
                                title="You can add an item by clicking here, too.">
                                Add +
                            </span>
                        ) : <span className="text">{i}</span>
                }
                <span
                    className="remove"
                    style={removeStyle}
                    onClick={this.onRemoveItem.bind(this, i)}>
                    x
                </span>
            </div>
        );
    };
    renderLayouts = () => {
        return _.map(this.state.layouts, this.renderLayout);
    };

    render() {
        return (
            <div>
                {this.renderHeader()}
                <ResponsiveReactGridLayout
                    {...this.props}
                    layouts={{lg : this.state.layouts}}
                    // layout={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                    onLayoutChange={this.onLayoutChange}
                    // WidthProvider option
                    measureBeforeMount={false}
                    // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                    // and set `measureBeforeMount={true}`.
                    // onWidthChange={this.onWidthChange}
                    useCSSTransforms={this.state.mounted}
                >
                    {this.renderLayouts()}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

const generateLayout = () => {
    return _.map(_.range(0, 2), function (item, i) {
        var y = Math.ceil(Math.random() * 4) + 1;
        return {
            x: _.random(0, 5), //_.random(0, 5) * 2 % 12,
            y: Math.floor(i / 6) * y,
            w: 6,
            h: y * i + 4,
            i: i.toString()
        };
    });
};


GridLayoutComponent.propTypes = {
    onLayoutChange: React.PropTypes.func.isRequired
};

GridLayoutComponent.defaultProps = {
    className: "layout",
    rowHeight: 30,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    initialLayouts: generateLayout()
};


export {
    GridLayoutComponent
}
