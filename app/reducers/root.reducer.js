import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

/**
 * Reducers
 */
import pokeball from './pokeball.reducer';
import common from './common.reducer';
import layout from './layout.reducer';

const rootReducer = combineReducers({
    pokeball,
    common,
    layout,
    routing: routerReducer,
});

export default rootReducer;
