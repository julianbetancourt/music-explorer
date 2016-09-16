import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './sass/main.sass';
import { Router, Route, browserHistory } from 'react-router';

import ArtistList from './containers/ArtistList';
import ArtistProfile from './containers/ArtistProfile';
// //KEY e62624f493da5c6d7453f5e0be3d76d9

import { Provider } from 'react-redux';
import configStore from './store/configStore';

const store = configStore();


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/search/:term" component={ArtistList} />
        <Route path="/artist/:artist" component={ArtistProfile} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);







//------------------------------------------------------------------
// I need:
//   / -> Description
//   /search/:term ->
//   /artist/:artist
//   /country/Colombia
