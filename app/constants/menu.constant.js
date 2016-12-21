import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from '../store/root.store';
const initialState = {};
export const store = configureStore(initialState);

import TableVirtualized from '../containers/reactVirtualized/TableVirtualized.container.jsx';
import TableDatagrid from '../containers/reactDatagrid/TableDatagrid.container.jsx';
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


export const layouts = {
    virtulized: {
        fullName: 'Виртуалайз',
        name: 'virtulized',
        componentGolden: ()=> ReduxComponentWrapper.call(null, TableVirtualized),
        component: React.createElement(TableVirtualized)
    },
    table: {
        fullName: 'Таблица',
        name: 'table',
        componentGolden: ()=> ReduxComponentWrapper.call(null, TableDatagrid),
        component: React.createElement(TableDatagrid)
    },
    individual: {
        fullName: 'Физ. лицо',
        name: 'individual',
        componentGolden: () => ReduxComponentWrapper.call(null, Invidual),
        component: React.createElement(Invidual)
    }
};
