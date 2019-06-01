import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Home from './components/home/Home';
import Catalog from './components/catalog/Catalog'
import UploadPhoto from './components/uploadPhoto/UploadPhoto'
import Restaurant from './components/restaurant/Restaurant';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const Routes = (
  <Router history={history} basename="/">
    <Switch>  
      <Route exact path="/" component={Home}/>
      <Route path="/catalog" component={Catalog}/>
      <Route path="/upload" component={UploadPhoto}/>
      <Route path="/restaurant/:name" component={Restaurant}/>
      
      {/* <Redirect from="*" to="/" /> */}
      <Route component={Home} />
    </Switch>
  </Router>
);

export default Routes;
