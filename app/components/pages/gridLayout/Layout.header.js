import React, { Component } from 'react';


class LayoutHeader extends Component {

    render() {
        const {
            uuid,
            headerTitle,
            layoutComponent,
            isFullScreen,
            handleDeleteLayout,
            handleToggleFullScreenLayout
        } = this.props;

        const toggleScreenClassName = isFullScreen ? "normal-screen" : "full-screen";
        const component = React.cloneElement(layoutComponent, { uuid });

        return (
            <div>
                <div className="react-grid__header">
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
                {component}
            </div>
        );
    }
}


LayoutHeader.propTypes = {
    uuid: React.PropTypes.string.isRequired,
    headerTitle: React.PropTypes.string.isRequired,
    layoutComponent: React.PropTypes.object.isRequired,
    isFullScreen: React.PropTypes.bool.isRequired,
    handleDeleteLayout: React.PropTypes.func.isRequired,
    handleToggleFullScreenLayout: React.PropTypes.func.isRequired,
};

export {
    LayoutHeader
}
