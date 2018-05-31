/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：网易音乐 -- 热歌榜 ----reducers
 */

import {SERVER_HOT_LIST} from "../../actions/Home/hot";

let initStates = {
	server_hot:{tracks:[],hot_Already:false}
};
function hot(state = initStates,action){
	switch(action.type){
		
		//热歌榜
		case SERVER_HOT_LIST:
			let newHot = {hot_Already:true,...action.data};
			return Object.assign({},state,{
				server_hot:newHot,
			});

		default:
			return state;
	};
};


export default hot;


