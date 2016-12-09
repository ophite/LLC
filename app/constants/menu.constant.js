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


export const windows = {
    virtulized: {
        fullName: 'Виртуалайз',
        name: 'virtulized',
        componentGolden: ()=> ReduxComponentWrapper.call(null, TableVirtualized),
        component: TableVirtualized
    },
    table: {
        fullName: 'Таблица',
        name: 'table',
        componentGolden: ()=> ReduxComponentWrapper.call(null, Table),
        component: Table
    },
    individual: {
        fullName: 'Физ. лицо',
        name: 'individual',
        componentGolden: () => ReduxComponentWrapper.call(null, Invidual),
        component: Invidual
    }
};
