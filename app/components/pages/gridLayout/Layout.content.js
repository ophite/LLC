import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';


class LayoutContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollTop: 0,
        };
    }

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        if (node) {
            this.resizer = node.nextSibling;
            node.parentNode.addEventListener('scroll', this.debouncedOnScrollListener);
        }
    }

    debouncedOnScrollListener = (event) => {
        this.setState({
            scrollTop: event.target.scrollTop
        });
        this.resizer.style.bottom = -event.target.scrollTop + 'px';
    };

    renderHeader = () => {
        const {
            headerTitle,
            isFullScreen,
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

        return (
            <div className={classNameHeaderResult} style={Object.assign({}, !isFullScreen && {top: scrollTop + 'px'})}>
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
