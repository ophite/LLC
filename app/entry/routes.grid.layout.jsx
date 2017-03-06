import { Route } from 'react-router';

import App from '../containers/layouts/App.jsx';
import NotFoundPage from '../components/pages/notFound/NotFound.page.jsx'
import MainLayout from '../containers/layouts/MainLayout.container.jsx';
import GridLayoutContainer from '../containers/gridLayout/Grid.layout.container.jsx';


export default (
    <Route path="/" component={App}>
        <Route component={MainLayout}>
            <Route path="app" component={GridLayoutContainer}/>
            <Route path="404" component={NotFoundPage}/>
            <Route path='*' component={NotFoundPage}/>
        </Route>
    </Route>
);

