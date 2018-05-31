/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：网易音乐 -- 搜索 ----action
 */

import { fetchJson } from 'src/utils/fetch';
import {StaticToast} from 'src/components/common';
export const SERVER_SEARCH_LIST="SERVER_SEARCH_LIST";


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
	}
};
export default search;



