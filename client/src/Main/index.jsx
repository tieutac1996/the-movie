import React from 'react';
import Home from './Home';
import { Switch, Route } from 'react-router-dom';
import Movie from './Movie';
import NotFound from 'components/NotFound';

function Main() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Home}></Route>
        <Route path='/movie' component={Movie} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Main;
