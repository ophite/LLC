import React from 'react';
import reject from 'lodash/reject';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import './style.css';
// import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout';
// import ResponsiveReactGridLayout from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);


class GridLayoutPage extends React.Component {

    state = {
        currentBreakpoint: 'lg',
        mounted: false,
        layoutIdCounter: 0,
        layouts: [],
        fullScreenComponent: null
    };

    componentDidUpdate(prevProps, prevState) {
        const { stateLayouts, stateLayout } = this.props;
        if (prevProps.stateLayouts && prevProps.stateLayouts.length < stateLayouts.length) {
            this.onAddLayout(stateLayout);
        }
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    onAddLayout = (layout) => {
        this.setState({
            layoutIdCounter: this.state.layoutIdCounter + 1,
            layouts: [
                ...this.state.layouts,
                {
                    i: 'n' + this.state.layoutIdCounter,
                    x: this.state.layoutIdCounter * 2 % (this.state.cols || 12),
                    y: Infinity, // puts it at the bottom
                    w: 2,
                    h: 2,
                    layout
                }
            ]
        });
        window.dispatchEvent(new Event('resize'));
    };

    onDeleteLayout = (layoutElement) => {
        const { handleDeleteLayout } = this.props;
        handleDeleteLayout(layoutElement.layout);
        this.setState({ layouts: reject(this.state.layouts, { i: layoutElement.i }) });
    };

    onFullScreenLayout = (layoutElement) => {
        console.log('onFullScreenLayout')
        this.setState({
            fullScreenComponent: layoutElement.layout.component
        });
        // const index = findIndex(this.state.layouts, { i: layoutElement.i });
        // layoutElement.h = 7;
        // const l = [
        //     ...this.state.layouts.slice(0, index),
        //     layoutElement,
        //     ...this.state.layouts.slice(index, this.state.layouts.length - 1)
        // ];
        // this.setState({
        //     layouts: l
        // });
        // window.dispatchEvent(new Event('resize'));
    };

    onBreakpointChange = (breakpoint, cols) => {
        console.log('onBreakpointChange')
        this.setState({
            currentBreakpoint: breakpoint,
            cols: cols
        });
    };

    onLayoutChange = (layout, layouts) => {
        console.log('onLayoutChange')
    };

    onWidthChange = (containerWidth, margin, cols, containerPadding) => {
    };

    renderLayouts = () => {
        const renderLayout = (layoutElement) => {
            const removeStyle = {
                position: 'absolute',
                right: '2px',
                top: 0,
                cursor: 'pointer'
            };
            const fullScreenStyle = {
                position: 'absolute',
                right: '12px',
                top: 0,
                cursor: 'pointer'
            };

            return (
                <div key={layoutElement.i} data-grid={layoutElement}>
                    <div>
                        <span
                            className="remove"
                            style={removeStyle}
                            onClick={this.onDeleteLayout.bind(this, layoutElement)}>
                            x
                        </span>
                    </div>
                    <div>
                        <span
                            className="remove"
                            style={fullScreenStyle}
                            onClick={this.onFullScreenLayout.bind(this, layoutElement)}>
                            []
                        </span>
                    </div>
                    {layoutElement.layout.component}
                </div>
            );
        };

        console.log('this.state.layouts', this.state.layouts);
        return map(this.state.layouts, renderLayout);
    };

    onResize = (layouts) => {
        this.setState({
            layouts,
        });
    };

    render() {
        if (this.state.fullScreenComponent) {
            return (
                <div>
                    {this.state.fullScreenComponent}
                </div>
            )
        }

        return (
            <div>
                <ResponsiveReactGridLayout
                    // {...this.props}
                    onResizeStop={this.onResize}
                    // layouts={{lg : this.state.layouts}}
                    // layouts={this.state.layouts}
                    layout={this.state.layouts}
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


GridLayoutPage.propTypes = {
    stateLayout: React.PropTypes.object,
    stateLayouts: React.PropTypes.array,
};

GridLayoutPage.defaultProps = {
    className: "layout",
    rowHeight: 30,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
};


export {
    GridLayoutPage
}
