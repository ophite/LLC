import { Route } from 'react-router';

import App from '../containers/layouts/App.jsx';
import NotFoundPage from '../components/pages/notFound/NotFound.page.jsx'
import Layout from '../containers/layouts/Layout.container.jsx';
import { initGolden } from '../components/controls/goldenLayout/golden.init';

initGolden();

export default (
    <Route path="/" component={App}>
        <Route path="app" component={Layout}/>
        <Route path="404" component={NotFoundPage}/>
        <Route path='*' component={NotFoundPage}/>
    </Route>
);