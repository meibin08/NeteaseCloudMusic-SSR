/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：网易音乐 -- 搜索 ----reducers
 */

import {SERVER_SEARCH_LIST,SEARCH_RESULT,SEARCH_SET_VAL,SEARCH_SETTING,SEARCH_HISTORY_PUSH,SEARCH_RESET,SEARCH_HISTORY_DELETE} from "../../actions/Home/search";
import update from 'immutability-helper';
let initStates = {
	isSearch:false,
	searchTxt:"",//搜索的关键字
	server_search:{list:[],search_Already:false},
	searchResult:{list:[],song_Already:false},
	history:[]
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
			
		case SEARCH_RESET:
			return {...initStates,server_search:state.server_search};
			
		case SEARCH_RESULT: //搜索结果
			return Object.assign({},state,{
				searchResult:{song_Already:true,list:[].concat(state.searchResult.list,action.data)},
			});
		case SEARCH_RESULT: //搜索结果
			return Object.assign({},state,{
				searchResult:{song_Already:true,list:[].concat(state.searchResult.list,action.data)},
			});
		case SEARCH_HISTORY_PUSH:
			return {...state,
				history:[...new Set([...state.history,action.data])],
			};

		case SEARCH_HISTORY_DELETE:
			return update(state, {
				history: {
					$splice: [[action.startIndex,1]],
				},
			});
		default:
			return state;
	};
};


export default search;


