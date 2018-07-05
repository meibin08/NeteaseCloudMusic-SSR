/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：网易音乐 -- 搜索 ----reducers
 */

import {SERVER_SEARCH_LIST,SEARCH_RESULT,SEARCH_SET_VAL,SEARCH_SETTING} from "../../actions/Home/search";

let initStates = {
	isSearch:false,
	searchTxt:"",//搜索的关键字
	server_search:{list:[],search_Already:false},
	searchResult:{list:[],song_Already:false}
};
function search(state = initStates,action){
	switch(action.type){
		
		//搜索 -> 热门搜索
		case SERVER_SEARCH_LIST:
			return Object.assign({},state,{
				server_search:{search_Already:true,list:action.data},
			});
		//设置搜索的关键字
		case SEARCH_SET_VAL:
			return Object.assign({},state,{
				searchTxt:action.data,
			});
		
		case SEARCH_SETTING:
			return Object.assign({},state,{...action.data});
			
		case SEARCH_RESULT: //搜索结果
			return Object.assign({},state,{
				searchResult:{song_Already:true,list:[].concat(state.searchResult.list,action.data)},
			});

		default:
			return state;
	};
};


export default search;


