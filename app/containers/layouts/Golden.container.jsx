import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';

import configureStore from '../../store/root.store';
const initialState = {};
const store = configureStore(initialState);
const GoldenLayout = require('golden-layout');
import Table from '../react-datagrid/Grid.container.jsx';
import Invidual from '../../components/pages/physical-person/PhysicalPerson.page.jsx';


const goldenLayout = new GoldenLayout({
    settings: {
        showPopoutIcon: false
    },
    dimensions: {
        borderWidth: 5,
        minItemHeight: 10,
        minItemWidth: 10,
        headerHeight: 20,
        dragProxyWidth: 300,
        dragProxyHeight: 200
    },
    content: [
        {
            type: 'row',
            isClosable: false,
            content: []
        }
    ]
});


const ReduxComponentWrapper = (componentView) => {
    return function (container, state) {
        var m = container.getElement()[0];
        const view = (
            <Provider store={store}>
                {React.createElement(componentView)}
            </Provider>
        );

        ReactDOM.render(view, m);
    };
};

export const addWindow = (title, componentName, componentState) => {
    if (goldenLayout._maximisedItem) {
        return;
    }

    var newItemConfig = {
        title: title,
        type: 'component',
        componentName,
        componentState
    };
    goldenLayout.root.contentItems[0].addChild(newItemConfig);
};

goldenLayout.registerComponent('table', ReduxComponentWrapper.call(null, Table));
goldenLayout.registerComponent('individual', ReduxComponentWrapper.call(null, Invidual));
goldenLayout.on('stackCreated', function (stack) {
    stack
        .header
        .controlsContainer
        .find('.lm_close') //get the close icon
        .off('click') //unbind the current click handler
        .click(function () {
            stack.remove();
            goldenLayout._maximisedItem = null;
        });
});
goldenLayout.on('tabCreated', function (tab) {
    tab
        .closeElement
        .off('click') //unbind the current click handler
        .click(function () {
            //add your own
            tab.contentItem.remove();
            goldenLayout._maximisedItem = null;
        });
});
goldenLayout.init();


class GoldenContainer extends Component {
    render() {
        return (
            <Provider store={store}>
                <goldenLayout/>
            </Provider>
        );
    }
}

export default GoldenContainer;
