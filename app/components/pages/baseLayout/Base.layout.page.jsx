import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { LAYOUT_CUSTOM_ATTRIBUTE } from '../../../constants/layout.constant';
import { DragDropManager } from 'dnd-core'
import HTML5Backend from 'react-dnd-html5-backend';


let defaultManager;
const getDefaultManager = () => {
    if (!defaultManager) {
        defaultManager = new DragDropManager(HTML5Backend);
    }
    return defaultManager;
};


class BaseLayoutPage extends Component {

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
        const element = ReactDOM.findDOMNode(this.currentLayoutDom);
        element.setAttribute(LAYOUT_CUSTOM_ATTRIBUTE, uuid);
    }

    render() {
        return (
            <div ref={(ref) => this.currentLayoutDom = ref}>
            </div>
        );
    }
}

export default BaseLayoutPage;
