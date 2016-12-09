import uuid from 'uuid';
import typesLayout from '../actions/types/layout.types';
import reject from 'lodash/reject';

const DEFAULT_STATE = {
    layout: null,
    layouts: [],
};


export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case typesLayout.ADD_LAYOUT:
            return reduceAddLayout(state, action);

        case typesLayout.DELETE_LAYOUT:
            return reduceDeleteLayout(state, action);

        default:
            return state;
    }
};


const reduceAddLayout = (state, action) => {
    const { layout } = action.payload;
    layout.uuid = uuid();

    return {
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
        layouts: reject(state.layouts, { uuid: layout.uuid }),
        layout: null
    };
};