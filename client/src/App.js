import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.css';
import Admin from './Admin';
import store from './components/redux/store';
import Header from 'components/Header';
import Main from 'Main';

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
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
