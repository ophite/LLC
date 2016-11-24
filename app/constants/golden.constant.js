import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from '../store/root.store';
const initialState = {};
const store = configureStore(initialState);

import TableVirtualized from '../containers/react-virtualized/Table.container.jsx';
import Table from '../containers/react-datagrid/Table.container.jsx';
import Invidual from '../components/pages/individual/Individual.page.jsx';


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
    },
};
