import React, { Component } from 'react';


class LayoutHeader extends Component {

    render() {
        const {
            layoutComponent,
            isFullScreen,
            handleDeleteLayout,
            handleToggleFullScreenLayout
        } = this.props;

        // TODO change icon to minify
        const toggleScreenClassName = isFullScreen ? "normal-screen" : "full-screen";

        return (
            <div>
                <div className="react-grid__header">
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
                {layoutComponent}
            </div>
        );
    }
}


LayoutHeader.propTypes = {
    layoutComponent: React.PropTypes.object.isRequired,
    isFullScreen: React.PropTypes.bool.isRequired,
    handleDeleteLayout: React.PropTypes.func.isRequired,
    handleToggleFullScreenLayout: React.PropTypes.func.isRequired,
};

export {
    LayoutHeader
}
