import { apiReducer } from './api.reducer';
import { pokemonModel } from '../models/pokemon.model';
import { pokemonsModel } from '../models/pokemons.model';

const DEFAULT_STATE = {
    [pokemonModel.MODEL_NAME]: pokemonModel.defaultState(),
    [pokemonsModel.MODEL_NAME]: pokemonsModel.defaultState(),
};

export default (state = DEFAULT_STATE, action) => {
    return apiReducer(state, action);
};
