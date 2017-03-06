import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from '../store/root.store';
const initialState = {};
export const store = configureStore(initialState);

import TableVirtualized from '../containers/reactVirtualized/TableVirtualized.container.jsx';
import InvidualReactToolbox from '../containers/individual/Individual.container.reacttoolbox.jsx';
import InvidualAntDesign from '../containers/individual/Individual.container.antdesign.jsx';


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
        fullName: 'Virtualized',
        name: 'virtulized',
        component: React.createElement(TableVirtualized)
    },
    individualReactToolbox: {
        fullName: 'Individual (react toolbox)',
        name: 'individualReactToolbox',
        component: React.createElement(InvidualReactToolbox)
    },
    individualAntdesign: {
        fullName: 'Individual (and design)',
        name: 'individualAntDesign',
        component: React.createElement(InvidualAntDesign)
    }
};
