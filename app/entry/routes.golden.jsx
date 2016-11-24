import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from '../containers/layouts/App.jsx';
import Golden from '../containers/layouts/Golden.container.jsx';
import NotFoundPage from '../components/pages/notFound/NotFound.page.jsx'
import Layout from '../containers/layouts/Layout.container.jsx';


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