/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：网易音乐 -- 推荐音乐 ----action
 */

import { fetchJson } from 'src/utils/fetch';
import {StaticToast} from 'src/components/common';
export const SERVER_HOME_PLAYLIST="SERVER_HOME_PLAYLIST";
export const HOME_NEWSONG="HOME_NEWSONG";

let home =  {
	playlist_fetch(){
		return (dispatch)=>{
			return fetchJson({
				type:"POST",
				//推荐歌单 - api
				url:"/serverApi/weapi/personalized/playlist",
				// url:"https://easy-mock.com/mock/5af54595dac0b7495244d48d/sayListen/list2",
				data : {
					limit:6,
					offset: 10,
					total: false,
					n: 6,
					csrf_token: ""
				},
			}).then(res=>{
				// console.log(1234,res)
				if(res.code == 200){
					let {result}=res;
					dispatch({
						type:SERVER_HOME_PLAYLIST,
						data:result
					});
				}else{
					StaticToast.error(res.error);
				};
				return Promise.resolve(res);
			});
		}
	},
	newsong(){ 
		return (dispatch)=>{
			fetchJson({
				type:"POST",
				//最新音乐 - api 
				url:"/musicApi/neteaseMusic/weapi/personalized/newsong",
				data:{type: 'recommend'},
				success:(res)=>{
					if(res.code == 200){
						let {result}=res;
						dispatch({
							type:HOME_NEWSONG,
							data:result
						});
					}else{
						StaticToast.error(res.error);
					};
				}
			});
		};
	}
};
export default home;



