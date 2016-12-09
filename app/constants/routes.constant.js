export default {
    notFound: () => '/404',
    pokeball: {
        getPokemons: () => '/pokemons',
        getPokemon: (id) => `app/pokemons/${id}`,
    },
};
