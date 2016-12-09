import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { GOLDEN_CUSTOM_ATTRIBUTE } from '../../controls/golden/golden.constant';
import { DragDropManager } from 'dnd-core'
import HTML5Backend from 'react-dnd-html5-backend';


let defaultManager;
const getDefaultManager = () => {
    if (!defaultManager) {
        defaultManager = new DragDropManager(HTML5Backend);
    }
    return defaultManager;
};


class GoldenComponentPage extends Component {

    static contextTypes = {
        dragDropManager: PropTypes.object
    };

    static childContextTypes = {
        dragDropManager: PropTypes.object
    };

    getChildContext() {
        return {
            dragDropManager: window.dragDropManager || this.context.dragDropManager || getDefaultManager()
        };
    }

    componentDidMount() {
        const { uuid } = this.props;
        const element = ReactDOM.findDOMNode(this.goldenWindow);
        element.setAttribute(GOLDEN_CUSTOM_ATTRIBUTE, uuid);
    }

    render() {
        return (
            <div ref={(ref) => this.goldenWindow = ref}>
            </div>
        );
    }
}

export default GoldenComponentPage;
