import React from 'react';
import ReactDOM from 'react-dom';
import reject from 'lodash/reject';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import { Responsive } from 'react-grid-layout';
import WidthProvider from './WidthProvider.jsx';

import { LayoutHeader } from './Layout.header'
import '../../../assets/styles/components/react-resizable.scss';
import '../../../assets/styles/components/grid-layout.scss';

const ResponsiveReactGridLayout = WidthProvider(Responsive);


class GridLayoutPage extends React.Component {

    state = {
        layoutIdCounter: 0,
        layouts: [],
        fullScreenLayout: null,
        restoreLayouts: false
    };

    componentDidUpdate(prevProps, prevState) {
        const { allLayouts, currentLayout } = this.props;
        if (prevProps.allLayouts && prevProps.allLayouts.length < allLayouts.length) {
            this.onAddLayout(currentLayout);
        }
    }

    _mergeLayout = (changedLayouts, resizerNode) => {
        const newLayouts = this.state.layouts.map(layout => {
            const changedIndex = findIndex(changedLayouts, { i: layout.i });
            const changedLayout = changedLayouts[changedIndex];

            if (layout.layoutObject.component && resizerNode) {
                const node = ReactDOM.findDOMNode(this.refs[layout.layoutObject.uuid]);
                if (node) {
                    const { handleChangeLayoutSize } = this.props;
                    const boundingClientRectResizer = resizerNode.getBoundingClientRect();
                    handleChangeLayoutSize(boundingClientRectResizer);
                }
            }

            return {
                ...changedLayout,
                layoutObject: layout.layoutObject
            };
        });

        this.setState({
            layouts: newLayouts
        });
    };

    onAddLayout = (layoutObject) => {
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
                    layoutObject
                }
            ]
        });
        window.dispatchEvent(new Event('resize'));
    };

    onDeleteLayout = (layout) => {
        const { handleDeleteLayout } = this.props;
        handleDeleteLayout(layout.layoutObject);
        this.setState({ layouts: reject(this.state.layouts, { i: layout.i }) });

        if (this.state.fullScreenLayout && this.state.fullScreenLayout.i === layout.i) {
            this.onToggleFullScreenLayout(layout);
        }
    };

    onToggleFullScreenLayout = (layout) => {
        this.setState({
            fullScreenLayout: this.state.fullScreenLayout ? null : layout
        });

        if (!this.state.fullScreenLayout) {
            const node = ReactDOM.findDOMNode(this);
            const { handleSaveLayout } = this.props;
            handleSaveLayout({
                width: node.offsetWidth
            });
        }
    };

    onLayoutChange = (layout, layouts) => {
        this._mergeLayout(layout);
    };

    onResizeStop = (layout, oldItem, newItem, placeholder, event, element) => {
        this._mergeLayout(layout, element.parentNode);
    };

    renderLayout = (layout) => {
        return (
            <div key={layout.i} data-grid={layout}>
                <LayoutHeader
                    ref={layout.layoutObject.uuid}
                    uuid={layout.layoutObject.uuid}
                    headerTitle={layout.layoutObject.fullName}
                    layoutComponent={layout.layoutObject.component}
                    isFullScreen={this.state.fullScreenLayout !==null}
                    handleDeleteLayout={this.onDeleteLayout.bind(this, layout)}
                    handleToggleFullScreenLayout={this.onToggleFullScreenLayout.bind(this, layout)}
                />
            </div>
        );
    };

    renderLayouts = () => {
        return map(this.state.layouts, this.renderLayout);
    };

    render() {
        if (this.state.fullScreenLayout) {
            return this.renderLayout(this.state.fullScreenLayout)
        }

        const { layoutProps } = this.props;
        return (
            <div>
                <ResponsiveReactGridLayout
                    initialWidth={layoutProps.width}
                    layout={this.state.layouts}
                    onLayoutChange={this.onLayoutChange}
                    onResizeStop={this.onResizeStop}
                    draggableHandle='.react-grid__header'
                >
                    {this.renderLayouts()}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}


GridLayoutPage.propTypes = {
    currentLayout: React.PropTypes.object,
    allLayouts: React.PropTypes.array,
    savedLayoutProps: React.PropTypes.object
};

GridLayoutPage.defaultProps = {
    className: "layout",
    rowHeight: 30,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
};

export {
    GridLayoutPage
}
