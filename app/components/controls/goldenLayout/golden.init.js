import React, { Component } from 'react';
import GoldenLayout from 'golden-layout';

import '../../../assets/styles/components/golden-layout.scss'
import { layouts, store } from '../../../constants/menu.constant';
import { goldenForceUpdate as handleGoldenForceUpdate } from '../../../actions/common.actions';
import { GOLDEN_CUSTOM_ATTRIBUTE } from './golden.constant';
import { goldenConfig } from './golden.config';


/***************** helper *********************/

export const addWindow = (goldenWindow, componentState) => {
    const newItemConfig = {
        title: goldenWindow.fullName,
        type: 'component',
        componentName: goldenWindow.name,
        componentState
    };

    let root = null;
    if (goldenLayoutComponent._maximisedItem) {
        root = goldenLayoutComponent._maximisedItem;
    } else {
        root = goldenLayoutComponent.root.contentItems.length ?
            goldenLayoutComponent.root.contentItems[0] :
            goldenLayoutComponent.root;
    }

    root.addChild(newItemConfig);
};

const initLayouts = (goldenLayoutComponent, goldenLayouts) => {
    for (const key in goldenLayouts) {
        const goldenWindow = goldenLayouts[key];
        goldenLayoutComponent.registerComponent(goldenWindow.name, goldenWindow.componentGolden());
    }
};

const getComponentUuid = (contentItem) => {
    if (!contentItem) {
        return null;
    }

    const attribute = contentItem
        .element[0]
        .childNodes[0]
        .childNodes[0]
        .attributes[GOLDEN_CUSTOM_ATTRIBUTE];
    if (!attribute) {
        return null;
    }

    return attribute.value;
};


/***************** golden layout *********************/
let goldenLayoutComponent;
export const initGolden = () => {
    const rootElement = document.getElementById('react-view');
    goldenLayoutComponent = new GoldenLayout(goldenConfig);
    goldenLayoutComponent.on('initialised', () => {
        $('html, body').css({
            'overflow-y': 'scroll',
            'overflow-x': 'hidden'
        });
    });
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
        tab.contentItem.container.on('resize', () => {
            store.dispatch(handleGoldenForceUpdate(getComponentUuid(tab.contentItem)));
        });
        tab._dragListener.on('dragStart', () => {
        });
        tab._dragListener.on('dragStop', () => {
            store.dispatch(handleGoldenForceUpdate(getComponentUuid(tab.contentItem)));
        });
        tab.closeElement
            .off('click') //unbind the current click handler
            .click(() => {
                //add your own
                tab.contentItem.remove();
                goldenLayoutComponent._maximisedItem = null;
            });
    });
    initLayouts(goldenLayoutComponent, layouts);
    goldenLayoutComponent.init();
};
