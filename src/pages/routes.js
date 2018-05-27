
import Home_route from './Home/route';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

const routes = {
  childRoutes: [{
    path: '/music',
    component: require('../components/app'),
    indexRoute:{ onEnter: (nextState, replace) => replace('/music/song') }, //默认重定向到->首页
    childRoutes: [
      ...Home_route,
      {
        path: '*',
        getComponent(nextState, callback) {
          require.ensure([], require => {
              callback(null, require('./NotFoundPage'))
          })
      }
    }]
  }]
}

export default routes



















