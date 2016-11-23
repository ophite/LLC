import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import GoldenLayout from 'golden-layout';
import Table from '../react-datagrid/Grid.container.jsx';
import Invidual from '../../components/pages/physical-person/PhysicalPerson.page.jsx';

import configureStore from '../../store/root.store';
const initialState = {};
const store = configureStore(initialState);

import '../../assets/styles/components/golden-layout.scss'


/***************** helper *********************/

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
    if (goldenLayoutComponent._maximisedItem) {
        return;
    }

    var newItemConfig = {
        title: title,
        type: 'component',
        componentName,
        componentState
    };
    goldenLayoutComponent.root.contentItems[0].addChild(newItemConfig);
};

/***************** golden layout *********************/

const goldenLayoutComponent = new GoldenLayout({
    settings: {
        showPopoutIcon: false
    },
    dimensions: {
        borderWidth: 5,
        minItemHeight: 10,
        minItemWidth: 10,
        headerHeight: 39,
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
goldenLayoutComponent.registerComponent('table', ReduxComponentWrapper.call(null, Table));
goldenLayoutComponent.registerComponent('individual', ReduxComponentWrapper.call(null, Invidual));
goldenLayoutComponent.on('stackCreated', function (stack) {
    stack
        .header
        .controlsContainer
        .find('.lm_close') //get the close icon
        .off('click') //unbind the current click handler
        .click(function () {
            stack.remove();
            goldenLayoutComponent._maximisedItem = null;
        });
});
goldenLayoutComponent.on('tabCreated', function (tab) {
    tab
        .closeElement
        .off('click') //unbind the current click handler
        .click(function () {
            //add your own
            tab.contentItem.remove();
            goldenLayoutComponent._maximisedItem = null;
        });
});
goldenLayoutComponent.init();

/***************** container *********************/

class GoldenContainer extends Component {
    render() {
        return (
            <Provider store={store}>
                <goldenLayoutComponent/>
            </Provider>
        );
    }
}

export default GoldenContainer;
