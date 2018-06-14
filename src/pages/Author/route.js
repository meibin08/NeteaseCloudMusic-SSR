/*
 * @authors :Bin Mei
 * @date    :2017-06-06
 * @description：网易音乐 -- 关于作者相关
 */

import bridge from 'src/utils/bridge';

module.exports = [
	{
    path: 'author', //更多示例
    /*getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./Index'));
      });
    },*/
    indexRoute: {
			getComponent(location, cb) {
				require.ensure([], (require) => {
					cb(null, require('./Index'));
				});
			},
			onEnter: () => bridge.doAction('setTitle', { title: '更多示例' })
		}
  }
];