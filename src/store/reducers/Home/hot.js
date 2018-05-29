/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：网易音乐 -- 热歌榜 ----reducers
 */

import {SERVER_HOT_LIST} from "../../actions/Home/hot";

let initStates = {
	server_hot:{tracks:[]}
};
function hot(state = initStates,action){
	switch(action.type){
		
		//热歌榜
		case SERVER_HOT_LIST:
			return Object.assign({},state,{
				server_hot:action.data
			});

		default:
			return state;
	};
};


export default hot;


