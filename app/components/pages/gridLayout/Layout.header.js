import React, { Component } from 'react';


class LayoutHeader extends Component {

    render() {
        const { layout, handleDeleteLayout, handleToggleFullScreenLayout } = this.props;
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
                            className="full-screen"
                            onClick={handleToggleFullScreenLayout}>
                        </span>
                    </div>
                </div>
                {layout.stateLayout.component}
            </div>
        );
    }
}


LayoutHeader.propTypes = {
    layout: React.PropTypes.object.isRequired,
    handleDeleteLayout: React.PropTypes.func.isRequired,
    handleToggleFullScreenLayout: React.PropTypes.func.isRequired,
};

export {
    LayoutHeader
}
