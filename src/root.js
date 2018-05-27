import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import { browserHistory, Router,match } from 'react-router';
import configureStore from "src/store";
import routes from './pages/routes';

const Store = configureStore(window.__initState__);

match({history: browserHistory, routes}, (error, redirectLocation, renderProps) => {
  ReactDOM.hydrate(
      <Provider store={Store}>
          <Router {...renderProps}/>
      </Provider>,
      document.getElementById('app')
  )
})


