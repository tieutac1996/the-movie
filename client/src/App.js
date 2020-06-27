import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './app.css';
import Admin from './components/Admin';
import store from './components/redux/store';

function App() {
  const admin = window.location.pathname.search('/admin');

  return (
    <div className='container'>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/admin' component={Admin} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
