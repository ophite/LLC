import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from '../store/root.store';
const initialState = {};
export const store = configureStore(initialState);

import TableVirtualized from '../containers/react-virtualized/Table.container.jsx';
import Table from '../containers/react-datagrid/Table.container.jsx';
import Invidual from '../containers/individual/Individual.container.jsx';


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

export const goldenWindows = {
    virtulized: {
        fullName: 'Виртуалайз',
        name: 'virtulized',
        component: ()=> ReduxComponentWrapper.call(null, TableVirtualized)
    },
    table: {
        fullName: 'Таблица',
        name: 'table',
        component: ()=> ReduxComponentWrapper.call(null, Table)
    },
    individual: {
        fullName: 'Физ. лицо',
        name: 'individual',
        component: () => ReduxComponentWrapper.call(null, Invidual)
    }
};

export const goldenConfigDefaults = {
    openPopouts: [],
    settings: {
        hasHeaders: true,
        constrainDragToContainer: true,
        reorderEnabled: true,
        selectionEnabled: false,
        popoutWholeStack: false,
        blockedPopoutsThrowError: true,
        closePopoutsOnUnload: true,
        showPopoutIcon: true,
        showMaximiseIcon: true,
        showCloseIcon: true
    },
    dimensions: {
        borderWidth: 5,
        minItemHeight: 10,
        minItemWidth: 10,
        headerHeight: 20,
        dragProxyWidth: 300,
        dragProxyHeight: 200
    },
    labels: {
        close: 'close',
        maximise: 'maximise',
        minimise: 'minimise',
        popout: 'open in new window',
        popin: 'pop in'
    }
};

export const goldenConfig = {
    ...goldenConfigDefaults,
    settings: {
        ...goldenConfigDefaults.settings,
        showPopoutIcon: false
    },
    dimensions: {
        ...goldenConfigDefaults.dimensions,
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
            isClosable: true,
            content: [
                {
                    type: 'component',
                    componentName: goldenWindows.virtulized.name,
                    props: { value: 'I\'m on the left' }
                }
            ]
        }
    ]
};

export const GOLDEN_CUSTOM_ATTRIBUTE = 'golden_custom_attribute';