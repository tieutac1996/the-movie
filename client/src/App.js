import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './app.css';

import Main from './components/Main';
import Header from './components/Header';

import store from './components/redux/store';
import Admin from './components/Admin';
function App() {
  const admin = window.location.pathname.search('/admin');

  return (
    <div className='container'>
      <Provider store={store}>
        <Router>
          {admin === -1 && <Header />}
          <Switch>
            <Route path='/' exact component={Main} />
            <Route path='/admin' component={Admin} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
