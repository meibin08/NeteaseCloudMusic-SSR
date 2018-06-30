/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：网易音乐 -- 歌曲播放页 ----action
 */
import {SERVER_PLAYER_INFO,LYRIC_BASE,LYRIC_INFO} from "../../actions/Song";

let initStates = {
	server_player_info:{nemwxs:{},player_Already:false},
	lyric_info:{list:[],lyric_Already:false}
};


//获取歌词的时间
function lyricTime (currentTtem){
	let secondNum = 60;//60s
	let currentTagArr = currentTtem.split(":")
	let currentMinute = parseFloat(currentTagArr[0]);
	let currentSecond = parseFloat(currentTagArr[1]||0);
	let currentTime = (currentMinute*secondNum + currentSecond).toFixed(2);
	return parseFloat(currentTime);
}
function Song(state = initStates,action){
	switch(action.type){
		
		//获取歌曲的音频信息
		case SERVER_PLAYER_INFO:
			let newPlay = {player_Already:true,...state.server_player_info,...action.data};
			return Object.assign({},state,{
				server_player_info:newPlay,
			});
		
		//获取歌曲的基本信息
		case LYRIC_BASE:
			let {songs:{name,ar,al,id}}=action.data;
			let nemwxs = {
				content:name,
				picUrl:al.picUrl,
				resId:id,
				picId_str:al.picId_str||al.pic_str||al.pic,
				resType:"song",
				title:name
			};
			return Object.assign({},state,{
				server_player_info:{...state.server_player_info,nemwxs},
			});

		//获取歌曲的歌词信息
		case LYRIC_INFO:
			let result = action.data.split(/\r\n|\r|\n/);
			let lyric_list = [];
			let repeat_list = [];//重复部分
			let d = /\[(.*?)\]/gi;
			result.forEach((item,index)=>{
				let _item = item.split(/\[(.*?)\]/);
				_item.shift();
				let content = _item[_item.length-1];
				let tag = _item[0];
				if(_item.length<=2 && !_item[_item.length-1]){
					lyric_list = [].concat(lyric_list,repeat_list);
					repeat_list=[];
				}else	if(_item.length>2){ //有重复的内容
					lyric_list.push({
						time:lyricTime(_item[_item.length-2]),
						tag:_item[_item.length-2],
						content
					});
					repeat_list.push({
						time:lyricTime(tag),
						tag,
						content
					});
				}else{
					lyric_list.push({
						time:lyricTime(tag),
						tag,
						content
					})
				};

      })
					// console.log(lyric_list)
			return Object.assign({},state,{
				lyric_info:{
					list:lyric_list,
					lyric_Already:true
				},
			});
			

		default:
			return state;
	};
};


export default Song;



