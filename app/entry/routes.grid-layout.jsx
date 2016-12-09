import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from '../containers/layouts/App.jsx';
import NotFoundPage from '../components/pages/notFound/NotFound.page.jsx'
import Layout from '../containers/layouts/Layout.container.jsx';
import GridLayoutContainer from '../containers/gridLayout/GridLayout.container.jsx';


export default (
    <Route path="/" component={App}>
        <Route component={Layout}>
            <Route path="app" component={GridLayoutContainer}/>
            <Route path="404" component={NotFoundPage}/>
            <Route path='*' component={NotFoundPage}/>
        </Route>
    </Route>
);

