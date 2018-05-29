/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：网易音乐 -- 推荐音乐 ----reducers
 */

import {SERVER_HOME_PLAYLIST,HOME_NEWSONG} from "../../actions/Home";

let initStates = {
	newsong:[],
	server_playlist:[],
	playlist_Already:false,//表示已请求过
	song_Already:false
};
function home(state = initStates,action){
	switch(action.type){
		
		//推荐歌单
		case SERVER_HOME_PLAYLIST:
			let result = action.data.slice(0,6);
			return Object.assign({},state,{
				server_playlist:result,playlist_Already:true
			});
			
		//最新音乐
		case HOME_NEWSONG: 
			return Object.assign({},state,{
				newsong:action.data,song_Already:true
			});

		default:
			return state;
	};
};


export default home;


