import uuid from 'uuid';
import typesLayout from '../actions/types/layout.types';
import reject from 'lodash/reject';

const DEFAULT_STATE = {
    currentLayout: null,
    allLayouts: [],
    layoutProps: {},
    layoutPropsSize: {},
};


export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case typesLayout.ADD_LAYOUT:
            return reduceAddLayout(state, action);

        case typesLayout.DELETE_LAYOUT:
            return reduceDeleteLayout(state, action);

        case typesLayout.SAVE_LAYOUT:
            return reduceSaveLayout(state, action);

        case typesLayout.CHANGE_LAYOUT_SIZE:
            return reduceChangeLayoutSize(state, action);

        default:
            return state;
    }
};


const reduceAddLayout = (state, action) => {
    const { layout } = action.payload;
    layout.uuid = uuid();

    return {
        ...state,
        allLayouts: [
            ...state.allLayouts,
            layout
        ],
        currentLayout: layout
    };
};

const reduceDeleteLayout = (state, action) => {
    const { layout } = action.payload;
    return {
        ...state,
        allLayouts: reject(state.allLayouts, { uuid: layout.uuid }),
        layout: null
    };
};

const reduceSaveLayout = (state, action) => {
    const { layoutProps } = action.payload;
    return {
        ...state,
        layoutProps
    };
};

const reduceChangeLayoutSize = (state, action) => {
    const { layoutPropsSize } = action.payload;
    return {
        ...state,
        layoutPropsSize
    };
};
