import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Banner from './Banner';
import Movie from './Movie';

function Admin() {
  return (
    <div>
      <Switch>
        <Route path='/admin/banner' component={Banner} />
        <Route path='/admin/movie' component={Movie} />
      </Switch>
    </div>
  );
}

export default Admin;
