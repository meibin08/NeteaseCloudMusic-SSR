import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import { hashHistory,browserHistory, Router,match } from 'react-router';
import configureStore from "src/store";
import routes from './pages/routes';

const Store = configureStore(window.__initState__);
const __history__ = (!__STATIC__?browserHistory:hashHistory);

match({history: __history__, routes}, (error, redirectLocation, renderProps) => {
	// console.log(error, redirectLocation,renderProps)
  ReactDOM.render(
      <Provider store={Store}>
          <Router {...renderProps}/>
      </Provider>,
      document.getElementById('app')
  )
})


