/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：网易音乐 -- 首页模块
 */

import bridge from 'src/utils/bridge';
import Main from './Component/Main';

module.exports = [
	{
		path: 'music', //推荐音乐
		component:Main,
		indexRoute: {
			getComponent(location, cb) {
				require.ensure([], (require) => {
					cb(null, require('./Index'));
				});
			},
			onEnter: () => bridge.doAction('setTitle', { title: '推荐音乐' })
		}
	},
	{
		path: 'hot', //热歌榜
		component:Main,
		indexRoute: {
			getComponent(location, cb) {
				require.ensure([], (require) => {
					cb(null, require('./Hot'));
				});
			},
			onEnter: () => bridge.doAction('setTitle', { title: '热歌榜' })
		}
	},
	{
		path: 'search', // 搜索
		component:Main,
		indexRoute: {
			getComponent(location, cb) {
				require.ensure([], (require) => {
					cb(null, require('./Search'));
				});
			},
			onEnter: () => bridge.doAction('setTitle', { title: '搜索' })
		}
	},
]
	