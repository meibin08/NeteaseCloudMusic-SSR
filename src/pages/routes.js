/*
 * @authors :Bin Mei
 * @date    :2017-06-01
 * @description：网易音乐 -- 项目根路由
 */
import Home_route from './Home/route';
import Song_route from './Song/route';
import Author_route from './Author/route';
import bridge from 'src/utils/bridge';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

const routes = {
  childRoutes: [{
    path: '/',
    component: require('../components/app'),
    indexRoute:{ onEnter: (nextState, replace) => replace('/music') }, //默认重定向到->首页
    childRoutes: [
      ...Home_route,
      ...Song_route,
      ...Author_route,
      {
        path: '*',
        getComponent(nextState, callback) {
          require.ensure([], require => {
              callback(null, require('./NotFoundPage'))
          })
        }
      }
    ]
  }]
}


export default routes



















