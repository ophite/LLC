import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '../../assets/styles/components/golden-layout.scss'
import GoldenLayout from 'golden-layout';
import TableVirtualized from '../react-virtualized/Table.container.jsx';
import Table from '../react-datagrid/Table.container.jsx';
import Invidual from '../../components/pages/individual/Individual.page.jsx';

import configureStore from '../../store/root.store';
const initialState = {};
const store = configureStore(initialState);


/***************** helper *********************/

const ReduxComponentWrapper = (componentView) => {
    return (container, state) => {
        const rootElement = container.getElement()[0];
        const view = (
            <Provider store={store}>
                {React.createElement(componentView)}
            </Provider>
        );

        ReactDOM.render(view, rootElement);
    };
};

export const addWindow = (title, componentName, componentState) => {
    const newItemConfig = {
        title: title,
        type: 'component',
        componentName,
        componentState
    };
    if (goldenLayoutComponent._maximisedItem) {
        goldenLayoutComponent._maximisedItem.addChild(newItemConfig);
    } else {
        goldenLayoutComponent.root.contentItems[0].addChild(newItemConfig);
    }
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
            content: [
                // {
                //     type: 'component',
                //     componentName: 'virtulized',
                // },
            ]
        }
    ]
});
goldenLayoutComponent.registerComponent('virtulized', ReduxComponentWrapper.call(null, TableVirtualized));
goldenLayoutComponent.registerComponent('table', ReduxComponentWrapper.call(null, Table));
goldenLayoutComponent.registerComponent('individual', ReduxComponentWrapper.call(null, Invidual));
goldenLayoutComponent.on('stackCreated', (stack) => {
    stack
        .header
        .controlsContainer
        .find('.lm_close') //get the close icon
        .off('click') //unbind the current click handler
        .click(() => {
            stack.remove();
            goldenLayoutComponent._maximisedItem = null;
        });
});
goldenLayoutComponent.on('tabCreated', (tab) => {
    tab
        .closeElement
        .off('click') //unbind the current click handler
        .click(() => {
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
