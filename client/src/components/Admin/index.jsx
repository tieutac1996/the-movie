import React from 'react';
import Banner from './Banner';
import { Switch, Route } from 'react-router-dom';

function Admin() {
  return (
    <div>
      <Switch>
        <Route path='/admin/banner' component={Banner} />
      </Switch>
    </div>
  );
}

export default Admin;
