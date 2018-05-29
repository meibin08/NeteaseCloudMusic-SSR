

import { RouterContext, match ,createRoutes} from 'react-router';
import _routes from '../src/pages/routes';
import configureStore from '../src/store';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import React from 'react';


function getReduxPromise(props, store) {
    const comp = (props.components[props.components.length - 1].WrappedComponent||{});
    return comp.loadData ?
        comp.loadData({ store, props }) :
        Promise.resolve();
}

module.exports = function (app) {

  
  app.get('/',(req, res)=>res.redirect("/music/song"));
  app.get('/music/*', function (req, res, next) {
    // const history = createMemoryHistory();
    const store = configureStore();
    const routes = createRoutes(_routes);
    res.header("Access-Control-Allow-Origin", req.headers["origin"] || "*");
    match({routes, location: req.url }, (error, redirectLocation, renderProps) => {
    // console.log(error, redirectLocation, renderProps);
        if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.send(500, error.message);
        } else if (renderProps === null) {
            res.send(404, 'Not found');
            console.log("去失败页",renderProps)
            // res.redirect("/fail");
        } else if (renderProps) {
            getReduxPromise(renderProps, store).then(() => {
                const reduxState = JSON.stringify(store.getState()).replace(/</g, '\\x3c');
                const html = ReactDOMServer.renderToString(<Provider store={store}>{<RouterContext {...renderProps} />}</Provider>);
                res.render('index', { html, reduxState });
            }).catch(e => {
                console.log(46,e);
            });
        }else{
            console.log("#######-------------req.url:"+req.url);
            res.redirect("/fail");
            // next()
        }
    });
  });

};
