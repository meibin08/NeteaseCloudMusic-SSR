/*
 * @authors :Bin Mei
 * @date    :2017-06-01
 * @description：网易音乐 -- 项目根路由
 */
import Home_route from './Home/route';
import bridge from 'src/utils/bridge';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

const routes = {
  childRoutes: [{
    path: '/',
    component: require('../components/app'),
    indexRoute:{ onEnter: (nextState, replace) => replace('/music') }, //默认重定向到->首页
    childRoutes: [
      ...Home_route,
      {
        path: 'song', //歌曲播放
        getComponent(location, cb) {
          require.ensure([], (require) => {
            cb(null, require('./Song'));
          });
        },
        onEnter: () => bridge.doAction('setTitle', { title: '推荐音乐' })
      },
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



















