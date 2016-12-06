import React from 'react';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './style.css';


class GridLayoutComponent extends React.Component {

    static propTypes = {
        onLayoutChange: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        className: "layout",
        rowHeight: 30,
        breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        initialItems: generateLayout()
    };

    state = {
        currentBreakpoint: 'lg',
        mounted: false,
        newCounter: 0,
        items: this.props.initialItems,
    };

    componentDidMount() {
        this.setState({ mounted: true });
    }

    createElement = (el) => {
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

    onAddItem = () => {
        console.log('adding', 'n' + this.state.newCounter);
        this.setState({
            // Add a new item. It must have a unique key!
            items: this.state.items.concat({
                i: 'n' + this.state.newCounter,
                x: this.state.items.length * 2 % (this.state.cols || 12),
                y: Infinity, // puts it at the bottom
                w: 2,
                h: 2
            }),
            // Increment the counter to ensure key is always unique.
            newCounter: this.state.newCounter + 1
        });
    };

    generateDOM = () => {
        // return _.map(this.state.items, function (l, i) {
        //     return (
        //         <div key={i}>
        //             <span className="text">aaa {i}</span>
        //         </div>);
        // });
        return _.map(this.state.items, this.createElement);
    };

    onBreakpointChange = (breakpoint, cols) => {
        this.setState({
            currentBreakpoint: breakpoint,
            // cols: cols
        });
    };

    onLayoutChange = (layout, layouts) => {
        this.props.onLayoutChange(layout, layouts);
        this.setState({ layout: layout });
    };

    onRemoveItem = (i) => {
        console.log('removing', i);
        this.setState({ items: _.reject(this.state.items, { i: i }) });
    };

    onNewLayout = () => {
        this.setState({
            items: generateLayout()
        });
    };

    render() {
        return (
            <div>
                <button onClick={this.onAddItem}>Add Item</button>
                <div>Current Breakpoint: {this.state.currentBreakpoint} ({this.props.cols[this.state.currentBreakpoint]}
                    columns)
                </div>
                <button onClick={this.onNewLayout}>Generate New Layout</button>
                <ResponsiveReactGridLayout
                    {...this.props}
                    layouts={{lg : this.state.items}}
                    onBreakpointChange={this.onBreakpointChange}
                    onLayoutChange={this.onLayoutChange}
                    // WidthProvider option
                    measureBeforeMount={false}
                    // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                    // and set `measureBeforeMount={true}`.
                    useCSSTransforms={this.state.mounted}>
                    {this.generateDOM()}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

function generateLayout() {
    return _.map(_.range(0, 25), function (item, i) {
        var y = Math.ceil(Math.random() * 4) + 1;
        return {
            x: _.random(0, 5) * 2 % 12,
            y: Math.floor(i / 6) * y,
            w: 2,
            h: y,
            i: i.toString()
        };
    });
}

export {
    GridLayoutComponent
}
