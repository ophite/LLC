import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';


class LayoutContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollTop: 0,
            isFilterMode: false,
        };
    }

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        if (node) {
            this.resizer = node.nextSibling;
            node.parentNode.addEventListener('scroll', this._onScrollListener);
        }
    }

    _onScrollListener = (event) => {
        this.setState({
            scrollTop: event.target.scrollTop
        });
        this.resizer.style.bottom = -event.target.scrollTop + 'px';
    };

    renderMenu = () => {
        // TODO this is will be menu
        return null;

        // const { isFilterMode } = this.state;
        // if (isFilterMode) {
        //     return (
        //         <div>
        //             <IconMenu icon='more_vert' position='topRight'>
        //                 <MenuItem
        //                     onClick={this.toggleFilter}
        //                     value='Hide filter'
        //                     caption='Hide filter'
        //                 />
        //                 <MenuItem
        //                     onClick={this.resetFilter}
        //                     value='Reset filter'
        //                     caption='Reset filter'
        //                 />
        //             </IconMenu>
        //         </div>
        //     );
        // } else {
        //     return (
        //         <div>
        //             <IconMenu icon='more_vert' position='topRight'>
        //                 <MenuItem
        //                     onClick={this.toggleFilter}
        //                     value='Show filter'
        //                     caption='Show filter'
        //                 />
        //             </IconMenu>
        //         </div>
        //     );
        // }
    };

    resetFilter = ()=> {
        setTimeout(()=> {
            this.setState({ filterValues: {} });
            this.props.handleResetFilter();
        }, 500) // TODO only for demo. Then delete, fix menu timeOut
    };

    toggleFilter = ()=> {
        setTimeout(()=> {
            this.setState({ isFilterMode: !this.state.isFilterMode });
        }, 500)// TODO only for demo. Then delete, fix menu timeOut
    };

    renderHeader = () => {
        const {
            headerTitle,
            isFullScreen,
            handleMenuLayout,
            handleDeleteLayout,
            handleToggleFullScreenLayout
        } = this.props;

        const toggleScreenClassName = isFullScreen ? "normal-screen" : "full-screen";
        const classNameHeader = {
            'react-grid__header': true,
            'header-full-screen': isFullScreen,
            'header-normal-screen': !isFullScreen,
        };
        const classNameHeaderResult = classNames(classNameHeader);
        const { scrollTop }= this.state;
        const headerStyle = Object.assign({}, !isFullScreen && { top: scrollTop + 'px' });

        return (
            <div className={classNameHeaderResult} style={headerStyle}>
                <div className="react-grid__title">{headerTitle}</div>
                <div>
                    <span
                        className="close"
                        onClick={handleDeleteLayout}>
                    </span>
                </div>
                <div>
                    <span
                        className={toggleScreenClassName}
                        onClick={handleToggleFullScreenLayout}>
                    </span>
                </div>
                <div>
                   <div className="layout-menu">
                       {this.renderMenu()}
                   </div>
                </div>
            </div>
        );
    };

    renderFooter = () => {
        const { isFullScreen } = this.props;
        if (isFullScreen) {
            return null;
        }

        const { scrollTop }= this.state;
        return (
            <div className="react-grid__footer" style={{bottom: -scrollTop + 'px'}}>
            </div>
        );
    };

    render() {
        const {
            uuid,
            layoutComponent,
        } = this.props;

        const component = React.cloneElement(layoutComponent, { uuid });

        return (
            <div>
                {this.renderHeader()}
                {component}
                {this.renderFooter()}
            </div>
        );
    }
}


LayoutContent.propTypes = {
    uuid: React.PropTypes.string.isRequired,
    headerTitle: React.PropTypes.string.isRequired,
    layoutComponent: React.PropTypes.object.isRequired,
    isFullScreen: React.PropTypes.bool.isRequired,
    handleDeleteLayout: React.PropTypes.func.isRequired,
    handleToggleFullScreenLayout: React.PropTypes.func.isRequired,
};

export {
    LayoutContent
}
