import Header from 'components/Header';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from './Admin';
import './app.css';
import store from './components/redux/store';
import Main from 'Main';
import NotFound from 'components/NotFound';

function App() {
  const admin = window.location.pathname.search('/admin');
  return (
    <div>
      <Provider store={store}>
        <Router>
          {admin === -1 && <Header />}
          {admin === -1 && <Main />}
          <Switch>
            <Route path='/admin' component={Admin} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
