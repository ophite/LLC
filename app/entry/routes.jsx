import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from '../containers/layouts/App.jsx';
import NotFoundPage from '../components/pages/notFound/NotFound.page.jsx'
import MainLayout from '../containers/layouts/MainLayout.container.jsx';
import Pokemon from '../containers/pokemons/Pokemon.container.jsx';
import Pokemons from '../containers/pokemons/Pokemons.container.jsx';
import TableVirtualized from '../containers/reactVirtualized/TableVirtualized.container.jsx';
import PhysicalPersonEdit from '../components/pages/individual/Individual.page.jsx';
import GridLayoutContainer from '../containers/gridLayout/Grid.layout.container.jsx';


export default (
    <Route path="/" component={App}>
        <Route path="/app" component={MainLayout}>
            <IndexRedirect to="pokemons"/>
            <Route path="grid" component={GridLayoutContainer}/>
            <Route path="virt" component={TableVirtualized}/>
            <Route path="person" component={PhysicalPersonEdit}/>
            <Route path="pokemons">
                <IndexRoute component={Pokemons}/>
                <Route path=":pokemonId" component={Pokemon}/>
            </Route>
        </Route>
        <Route path="404" component={NotFoundPage}/>
        <Route path='*' component={NotFoundPage}/>
    </Route>
);

