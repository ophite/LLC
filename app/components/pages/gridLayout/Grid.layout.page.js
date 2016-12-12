import React from 'react';
import ReactDOM from 'react-dom';
import reject from 'lodash/reject';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import { Responsive/*, WidthProvider*/ } from 'react-grid-layout';
import WidthProvider from './WidthProvider.jsx';

import { LayoutHeader } from './Layout.header'
import '../../../assets/styles/components/react-resizable.scss';
import '../../../assets/styles/components/grid-layout.scss';

// import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout';
// import ResponsiveReactGridLayout from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const originalLayouts = getFromLS('layouts') || [];

class GridLayoutPage extends React.Component {

    state = {
        currentBreakpoint: 'lg',
        mounted: false,
        layoutIdCounter: 0,
        layouts: [],
        fullScreenLayout: null,
        restoreLayouts: false
        // layouts: JSON.parse(JSON.stringify(originalLayouts))
    };

    componentDidUpdate(prevProps, prevState) {
        const { stateLayouts, stateLayout } = this.props;
        if (prevProps.stateLayouts && prevProps.stateLayouts.length < stateLayouts.length) {
            this.onAddLayout(stateLayout);
        }

        if (this.state.mounted && this.state.restoreLayouts) {
            // debugger
            // this.setState({
            //     restoreLayouts: false,
            // });
            // const layouts = JSON.parse(JSON.stringify(getFromLS('layouts') || []));
            // this._mergeLayout(layouts);
        }
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    onAddLayout = (stateLayout) => {
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
                    stateLayout
                }
            ]
        });
        window.dispatchEvent(new Event('resize'));
    };

    onDeleteLayout = (layout) => {
        const { handleDeleteLayout } = this.props;
        handleDeleteLayout(layout.stateLayout);
        this.setState({ layouts: reject(this.state.layouts, { i: layout.i }) });
    };

    onToggleFullScreenLayout = (layout) => {
        this.setState({
            fullScreenLayout: this.state.fullScreenLayout ? null : layout
        });

        if (!this.state.fullScreenLayout) {
            const node = ReactDOM.findDOMNode(this);
            // const { handleChangeBreakpoint } = this.props
            // handleChangeBreakpoint(this.state.currentBreakpoint);
            const {handleSaveLayout} = this.props;
            handleSaveLayout({
                width: node.offsetWidth
            });
            // saveToLS('width', node.offsetWidth)
            // saveToLS('layouts', this.state.layouts.map(l => {
            //     const tmpLayout = { ...l };
            //     delete tmpLayout.stateLayout;
            //     return tmpLayout;
            // }));
            // this.setState({
            //     restoreLayouts: false
            // });
        }
        else {
            // layouts: JSON.parse(JSON.stringify(getFromLS('layouts') || []))
            // this.setState({
            //     restoreLayouts: true
            // });
        }
    };

    onBreakpointChange = (breakpoint, cols) => {
        console.log('onBreakpointChange', breakpoint)
        this.setState({
            currentBreakpoint: breakpoint,
            cols: cols
        });
    };

    onLayoutChange = (layout, layouts) => {
        console.log('onLayoutChange layout', layout)
        console.log('onLayoutChange layouts', layouts)
        this._mergeLayout(layout);
    };

    onWidthChange = (containerWidth, margin, cols, containerPadding) => {
        this.setState({
            width: containerWidth,
        });
    };

    renderLayout = (layout) => {
        const headerView = (
            <LayoutHeader
                layout={layout}
                isFullScreen={this.state.fullScreenLayout !==null}
                handleDeleteLayout={this.onDeleteLayout.bind(this, layout)}
                handleToggleFullScreenLayout={this.onToggleFullScreenLayout.bind(this, layout)}
            />
        );

        console.log('this.state.fullScreenLayout', this.state.fullScreenLayout);

        if (this.state.fullScreenLayout) {
            return headerView;
        }

        return (
            <div key={layout.i} data-grid={layout}>
                {headerView}
            </div>
        );
    };

    renderLayouts = () => {
        return map(this.state.layouts, this.renderLayout);
    };

    _mergeLayout = (changedLayouts) => {
        const newLayouts = this.state.layouts.map(layout => {
            const changedIndex = findIndex(changedLayouts, { i: layout.i });
            const changedLayout = changedLayouts[changedIndex];

            return {
                ...changedLayout,
                stateLayout: layout.stateLayout
            };
        });

        this.setState({
            layouts: newLayouts
        });
    };

    onResize = (layout) => {
        // this._mergeLayout(layout);
    };

    render() {
        const { stateBreakpoint } = this.props;
        console.log('state layouts', this.state.layouts);
        if (this.state.fullScreenLayout) {
            return this.renderLayout(this.state.fullScreenLayout)
        }

        return (
            <div>
                <ResponsiveReactGridLayout
                    // initialWidth={this.state.width ? this.state.width: 1280}
                    // breakpoint={stateBreakpoint}
                    // {...this.props}
                    // onResizeStop={this.onResize}
                    // layouts={{lg : this.state.layouts}}
                    // layouts={this.state.layouts}
                    initialWidth={this.props.layoutProps.width}
                    layout={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                    onLayoutChange={this.onLayoutChange}
                    // WidthProvider option
                    // measureBeforeMount={false}
                    // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                    // and set `measureBeforeMount={true}`.
                    // onWidthChange={this.onWidthChange}
                    // useCSSTransforms={this.state.mounted}
                    draggableHandle='.react-grid__header'
                >
                    {this.renderLayouts()}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}


function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
        } catch (e) {/*Ignore*/
        }
    }
    return ls[key];
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem('rgl-8', JSON.stringify({
            [key]: value
        }));
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
