/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：网易音乐 -- 搜索 ----reducers
 */

import {SERVER_SEARCH_LIST} from "../../actions/Home/search";

let initStates = {
	server_search:{list:[],search_Already:false}
};
function search(state = initStates,action){
	switch(action.type){
		
		//搜索 -> 热门搜索
		case SERVER_SEARCH_LIST:
			return Object.assign({},state,{
				server_search:{search_Already:true,list:action.data},
			});

		default:
			return state;
	};
};


export default search;


