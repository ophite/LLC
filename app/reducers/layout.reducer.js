import uuid from 'uuid';
import typesLayout from '../actions/types/layout.types';
import reject from 'lodash/reject';

const DEFAULT_STATE = {
    layout: null,
    layouts: [],
    breakpoint: null,
    layoutProps: {}
};


export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case typesLayout.ADD_LAYOUT:
            return reduceAddLayout(state, action);

        case typesLayout.DELETE_LAYOUT:
            return reduceDeleteLayout(state, action);

        case typesLayout.CHANGE_BREAKPOINT:
            return reduceChangeBreakpointLayout(state, action);

        case typesLayout.SAVE_LAYOUT:
            return reduceSaveLayout(state, action);

        default:
            return state;
    }
};


const reduceAddLayout = (state, action) => {
    const { layout } = action.payload;
    layout.uuid = uuid();

    return {
        ...state,
        layouts: [
            ...state.layouts,
            layout
        ],
        layout
    };
};

const reduceDeleteLayout = (state, action) => {
    const { layout } = action.payload;
    return {
        ...state,
        layouts: reject(state.layouts, { uuid: layout.uuid }),
        layout: null
    };
};

const reduceChangeBreakpointLayout = (state, action) => {
    const { breakpoint } = action.payload;
    return {
        ...state,
        breakpoint,
    };
};

const reduceSaveLayout = (state, action) => {
    const { layoutProps } = action.payload;
    return {
        ...state,
        layoutProps,
    };
};
