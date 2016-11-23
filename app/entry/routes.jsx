import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from '../containers/layouts/App.jsx';
import Golden from '../containers/layouts/Golden.container.jsx';
import NotFoundPage from '../components/pages/notFound/NotFound.page.jsx'
import Layout from '../containers/layouts/Layout.container.jsx';
import Pokemon from '../containers/pokemons/Pokemon.container.jsx';
import Pokemons from '../containers/pokemons/Pokemons.container.jsx';
import Grid from '../containers/react-datagrid/Grid.container.jsx';
import PhysicalPersonEdit from '../components/pages/physical-person/PhysicalPerson.page.jsx';


export default (
    <Route path="/" component={App}>
        <Route component={Layout}>
            <IndexRedirect to="app"/>
            <Route path="app" component={Golden}/>
        </Route>

        <Route path="404" component={NotFoundPage}/>
        <Route path='*' component={NotFoundPage}/>
    </Route>
);

// <Route path="/entry" component={Layout}>
//     <IndexRedirect to="home"/>
//     <Route path="grid" component={Grid}/>
//     <Route path="person" component={PhysicalPersonEdit}/>
//     <Route path="home">
//         <IndexRoute component={Pokemons}/>
//         <Route path=":pokemonId" component={Pokemon}/>
//     </Route>
// </Route>
