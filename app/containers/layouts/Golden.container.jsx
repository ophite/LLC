import React, { Component } from 'react';
import '../../assets/styles/components/golden-layout.scss'
import GoldenLayout from 'golden-layout';
import { goldenWindows } from '../../constants/golden.constant';


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
        root = _maximisedItem;
    } else {
        root = goldenLayoutComponent.root.contentItems.length ?
            goldenLayoutComponent.root.contentItems[0] :
            goldenLayoutComponent.root;
    }

    root.addChild(newItemConfig);
};

const initWindows = (goldenLayoutComponent, goldenWindows) => {
    for (const key in goldenWindows) {
        const goldenWindow = goldenWindows[key];
        goldenLayoutComponent.registerComponent(goldenWindow.name, goldenWindow.component());
    }
};


/***************** golden layout *********************/

const goldenLayoutComponent = new GoldenLayout({
    settings: {
        showPopoutIcon: false
    },
    width: 800,
    dimensions: {
        width: 600,
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
                    componentName: goldenWindows.virtulized.name
                }
            ]
        }
    ]
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
    tab
        .closeElement
        .off('click') //unbind the current click handler
        .click(() => {
            //add your own
            tab.contentItem.remove();
            goldenLayoutComponent._maximisedItem = null;
        });
});
initWindows(goldenLayoutComponent, goldenWindows);
goldenLayoutComponent.init();


/***************** container *********************/

class GoldenContainer extends Component {
    render() {
        return (
            <goldenLayoutComponent/>
        );
    }
}

export default GoldenContainer;
