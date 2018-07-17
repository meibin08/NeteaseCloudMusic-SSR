/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：网易音乐 -- 歌曲播放页 ----action
 */

import { fetchJson } from 'src/utils/fetch';
import {StaticToast} from 'src/components/common';
export const SERVER_PLAYER_INFO="SERVER_PLAYER_INFO";
export const LYRIC_BASE="LYRIC_BASE";
export const LYRIC_INFO="LYRIC_INFO";

let Song =  {
	player_fetch(options={}){
		/* 
	  * 获取歌曲的音频信息 
	  * @param {Object} options 请求参数 
	  * @param {String} id 歌歌曲id 
	  * @param {String} br  不明白什么鬼，就用默认的 128000
	  * #Tips :服务端初始化，需要return promise 
	  */
	  let {id,br=128000,success}=options;
		return (dispatch)=>{
			return fetchJson({
				type:"POST",
				url:"/serverApi/weapi/song/enhance/player/url",
				data : {
					ids:[parseInt(id)],
			    br,
			    csrf_token: ''
				},
			}).then(res=>{
				// console.log(1234,res)
				if(res.code == 200){
					let {data}=res;
					// let nemwxs = JSON.parse(sessionStorage.getItem("nemwxs")||"{}");
					// let _data =Object.assign({},,{nemwxs});
					dispatch({
						type:SERVER_PLAYER_INFO,
						data:(data[0]||{})
					});
					// return Promise.resolve(res);
				}else{
					StaticToast.error(res.error);
				};
				return Promise.resolve(res);
			});
		}
	},
	song_detail(options={}){
		/* 
	  * 获取歌曲的基本信息，如背景图、头像等，名称
	  * @param {Object} options 请求参数 
	  * @param {String} id 歌歌曲id 
	  */
	  let {id}=options;
		return (dispatch)=>{
			return fetchJson({
				type:"POST",
				// url:`/musicApi/neteaseMusic/weapi/v1/artist/${id}`,
				url:`/musicApi/neteaseMusic/weapi/v3/song/detail`,
				data : {
					c: JSON.stringify([{ id: id }]),
    			ids: '[' + id + ']',
					csrf_token:""
				},
			}).then(res=>{
				// console.log(1234,res)
				if(res.code == 200){
					let {songs}=res;
					dispatch({
						type:LYRIC_BASE,
						data:{songs:Object.assign({},songs[0]||{},{id})}
					});
				}else{
					StaticToast.error(res.error);
				};
			});
		}
	},
	getLyric(options={}){
		/* 
	  * 获取歌曲的歌词信息
	  * @param {Object} options 请求参数 
	  * @param {String} id 歌歌曲id 
	  */
	  let {id}=options;
		return (dispatch)=>{
			return fetchJson({
				type:"POST",
				url:`/musicApi/neteaseMusic/weapi/song/lyric?os=osx&id=${id}&lv=-1&kv=-1&tv=-1`,
				data : {
					os:"osx",
					id,
					v:-1,
					kv:-1,
					tv:-1
				},
			}).then(res=>{
				if(res.code == 200){
					let {lrc={}}=res;
				// console.log(1234,result)
					dispatch({
						type:LYRIC_INFO,
						data:lrc.lyric||""
					});
				}else{
					StaticToast.error(res.error);
				};
			});
		}
	},
	
	
	
};
export default Song;



