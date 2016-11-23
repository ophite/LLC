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
import Table from '../react-datagrid/Grid.container.jsx';
import Invidual from '../../components/pages/physical-person/PhysicalPerson.page.jsx';
import MenuComponent from '../../components/controls/menu/Menu.jsx';


var goldenLayout = new GoldenLayout({
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

var TableComponent = function (container, state) {
    var m = container.getElement()[0];
    const view = (
        <Provider store={store}>
            <Table/>
        </Provider>
    );
    ReactDOM.render(view, m);
};
var InvidualComponent = function (container, state) {
    var m = container.getElement()[0];
    const view = (
        <Provider store={store}>
            <Invidual/>
        </Provider>
    );
    ReactDOM.render(view, m);
};

goldenLayout.registerComponent('table', TableComponent);
goldenLayout.registerComponent('individual', InvidualComponent);


export const addWindow = (title, componentName, componentState) => {
    var newItemConfig = {
        title: title,
        type: 'component',
        componentName,
        componentState
    };
    goldenLayout.root.contentItems[0].addChild(newItemConfig);
};

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
