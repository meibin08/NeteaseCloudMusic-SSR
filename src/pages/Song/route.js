/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：网易音乐 -- 播放页
 */

import bridge from 'src/utils/bridge';

module.exports = [
	{
    path: 'song/:id', //歌曲播放
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./Index'));
      });
    },
    onEnter: () => bridge.doAction('setTitle', { title: '推荐音乐' })
  }
];