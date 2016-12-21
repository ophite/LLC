import React, { Component } from 'react';


class LayoutHeader extends Component {

    render() {
        const {
            uuid,
            layoutComponent,
            isFullScreen,
            handleDeleteLayout,
            handleToggleFullScreenLayout
        } = this.props;

        // TODO change icon to minify
        const toggleScreenClassName = isFullScreen ? "normal-screen" : "full-screen";
        const component = React.cloneElement(layoutComponent, { uuid });
        console.log('layout.layoutObject', uuid);

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
                {component}
            </div>
        );
    }
}


LayoutHeader.propTypes = {
    uuid: React.PropTypes.string.isRequired,
    layoutComponent: React.PropTypes.object.isRequired,
    isFullScreen: React.PropTypes.bool.isRequired,
    handleDeleteLayout: React.PropTypes.func.isRequired,
    handleToggleFullScreenLayout: React.PropTypes.func.isRequired,
};

export {
    LayoutHeader
}
