/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：网易音乐 -- 搜索 ----action
 */

import { fetchJson } from 'src/utils/fetch';
import {StaticToast} from 'src/components/common';
export const SERVER_SEARCH_LIST="SERVER_SEARCH_LIST";
export const SEARCH_RESULT="SEARCH_RESULT";
export const SEARCH_SET_VAL="SEARCH_SET_VAL";
export const SEARCH_SETTING="SEARCH_SETTING";
export const SEARCH_HISTORY_PUSH="SEARCH_HISTORY_PUSH";
export const SEARCH_HISTORY_DELETE="SEARCH_HISTORY_DELETE";
export const SEARCH_RESET="SEARCH_RESET";


let search =  {
	search_fetch(){
		return (dispatch)=>{
			return fetchJson({
				type:"POST",
				//热门搜索 - api
				url:"/serverApi/weapi/search/hot",
				data : {
			    type: 1111
				},
			}).then(res=>{
				// console.log(1234,res)
				if(res.code == 200){
					let {result}=res;
					dispatch({
						type:SERVER_SEARCH_LIST,
						data:result.hots,
					});
				}else{
					StaticToast.error(res.error);
				};
				return Promise.resolve(res);
			});
		}
	},
	setSearchVal(val){
		return {
			type:SEARCH_SET_VAL,
			data:val
		}
	},
	set(config){
		return {
			type:SEARCH_SETTING,
			data:config
		}
	},
	clear(data){
		return {
			type:SEARCH_RESET,
			data
		}
	},
	
	search(searchTxt){
		return (dispatch,getState)=>{
			// let {homeSearch:{searchTxt}} =  getState();
			return fetchJson({
				type:"POST",
				url:`/musicApi/neteaseMusic/weapi/search/get`,
				data : {
					csrf_token: "",
					limit:30,
					type:1,
					queryCorrect:true,
					strategy:5,
					s: searchTxt,
					offset:0, //页数 1*30
				}
			}).then(res=>{
				if(res.code === 200){
					// console.log(res);
					let {songs} = res.result;
					// let searchResult = [].concat(this.state.searchResult,songs);
					dispatch({
						type:SEARCH_RESULT,
						data:songs,
					});
				};
				res.error&&StaticToast.error(res.error);
			});
		}
		
	},
	historyPush(data){
		return {
			type:SEARCH_HISTORY_PUSH,data
		}
	},
	historyDelete(startIndex){
		return {
			type:SEARCH_HISTORY_DELETE,startIndex
		}
	},
	
	
};
export default search;



