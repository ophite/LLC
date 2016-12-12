import React, { Component } from 'react';
import { layouts } from '../../../constants/menu.constant.js';


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
                    componentName: layouts.virtulized.name,
                    props: { value: 'I\'m on the left' }
                }
            ]
        }
    ]
};