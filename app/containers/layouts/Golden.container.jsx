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
// import Invidual from '../../components/pages/physical-person/PhysicalPerson.page.jsx';
import Invidual from '../pokemons/Pokemons.container.jsx';


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

const TableComponent = function (container, state) {
    var m = container.getElement()[0];
    const view = (
        <Provider store={store}>
            <Table/>
        </Provider>
    );
    ReactDOM.render(view, m);
};
const InvidualComponent = function (container, state) {
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

goldenLayout.on( 'stackCreated', function( stack ){
    stack
        .header
        .controlsContainer
        .find( '.lm_close' ) //get the close icon
        .off( 'click' ) //unbind the current click handler
        .click(function(){
            stack.remove();
            goldenLayout._maximisedItem = null;
        });
});


goldenLayout.on( 'tabCreated', function( tab ){
    tab
        .closeElement
        .off( 'click' ) //unbind the current click handler
        .click(function(){
            //add your own
            tab.contentItem.remove();
            goldenLayout._maximisedItem = null;
        });
});

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
