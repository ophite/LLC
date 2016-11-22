import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';

import configureStore from '../../store/root.store';
const initialState = {};
const store = configureStore(initialState);
const GoldenLayout = require('golden-layout');
import Pokemons from '../pokemons/Pokemons.container.jsx';
import NotFound from '../../components/pages/notFound/NotFound.page.jsx';
import Grid from '../fixed-data-table/Grid.container.jsx';
import Person from '../../components/pages/physical-person/PhysicalPerson.page.jsx';


var goldenLayout = new GoldenLayout({
    settings: {
        showPopoutIcon: false
    },
    content: [{
        type: 'row',
        content: [
            {
                type: 'component',
                componentName: 'Home',
                title: 'item A',
                ComponentState: { label: 'A' }
            },
            {
                type: 'column',
                content: [
                    {
                        type: 'component',
                        componentName: 'Home2',
                        title: 'item b',
                        props: { label: 'B' }
                    },
                ]
            },
            {
                type: 'column',
                content: [
                    {
                        type: 'component',
                        componentName: 'Grid',
                        title: 'Grid',
                        props: { label: 'B' }
                    },
                ]
            },
            {
                type: 'column',
                content: [
                    {
                        type: 'component',
                        componentName: 'Person',
                        title: 'Person',
                        props: { label: 'B' }
                    },
                ]
            }
        ]
    }]
});

var PokemonsComponent = function (container) {
    var m = container.getElement()[0];
    const view = (
        <Provider store={store}>
            <Pokemons/>
        </Provider>
    );
    ReactDOM.render(view, m);
};

var PokemonsComponent2 = function (container) {
    var m = container.getElement()[0];
    const view = (
        <Provider store={store}>
            <NotFound/>
        </Provider>
    );
    ReactDOM.render(view, m);
};

var GridComponent = function (container) {
    var m = container.getElement()[0];
    const view = (
        <Provider store={store}>
            <Grid/>
        </Provider>
    );
    ReactDOM.render(view, m);
};


var PersonComponent = function (container) {
    var m = container.getElement()[0];
    const view = (
        <Provider store={store}>
            <Person/>
        </Provider>
    );
    ReactDOM.render(view, m);
};
goldenLayout.registerComponent('Home', PokemonsComponent);
goldenLayout.registerComponent('Home2', PokemonsComponent2);
goldenLayout.registerComponent('Grid', GridComponent);
goldenLayout.registerComponent('Person', PersonComponent);

//Once all components are registered, call
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
