/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description： 网易音乐 -- 歌曲播放页
 */

import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classnames from 'classnames';
import { Link ,browserHistory } from 'react-router';
import { fetchJson } from 'src/utils/fetch';
import {StaticToast,Svg,PanelNav,RecommendChunk,Piece} from 'src/components/common';
import {Homeremd} from 'src/components/Skeleton';
import Comments from '../Comments';

import format from "src/utils/format";
import actions from "src/store/actions";

import './Song.scss';


class Song extends Component{
	static loadData(option) {
    if (option && option.store) {
				let {params}=option.props;
        return option.store.dispatch(actions.player_fetch({id:params.id}));
    } else {
        this.props.ACTIONS.player_fetch();
    }
  };
  state={
  	isPlay:true,
  	currentIndex:0,
  	playlists:[],
  	similar_Already:false,
  	simiSongLists:[],
  	simiSong_Already:false,
  }
  Audio=null;
	componentDidMount(){
		let {ACTIONS,params} = this.props;
	
		let options={id:params.id};
		ACTIONS.player_fetch(options).then((res)=>{
			this.initAudio(res.data[0].url);
			this.simiPlaylist(options.id);
			this.simiSong(options.id);
		});
		ACTIONS.getLyric(options);
		ACTIONS.song_detail(options);
	}
	componentWillUnmount(){
		this.Audio.pause();
		this.Audio.removeEventListener("timeupdate",()=>this.timeupdate());
		this.Audio=null;
	}
	//包含歌曲
	simiPlaylist = (id)=>{
		fetchJson({
			type:"post",
			//包含这首歌的歌单 - api
			url:"/musicApi/neteaseMusic/weapi/discovery/simiPlaylist",
			data : {
				limit:6,
				offset: 10,
				total: false,
				n: 6,
				songid:id,csrf_token: "",
			},
		}).then(res=>{
			if(res.code == 200){
				let {playlists}=res;
				this.setState({playlists,similar_Already:true});
			}else{
				StaticToast.error(res.msg);
			};
		});
	}
	//喜欢这首歌的人也听
	simiSong = (id)=>{
		fetchJson({
			type:"post",
			//喜欢这首歌的人也听 - api
			url:"/musicApi/neteaseMusic/weapi/discovery/simiSong",
			data : {
				songid:id,csrf_token: "",
			},
		}).then(res=>{
			if(res.code == 200){
				let {songs}=res;
				this.setState({simiSongLists:songs,simiSong_Already:true});
			}else{
				StaticToast.error(res.msg);
			};
		});
	}
	initAudio=(src)=>{
		this.Audio = new Audio(src);
		this.Audio.autoplay =true;
		
		//歌曲播放中
		this.Audio.addEventListener("timeupdate",()=>this.timeupdate());
		//歌曲结束
		this.Audio.addEventListener("ended",()=>{
			// this.Audio.pause();
			this.isPlayHandler();
			this.Audio.currentTime=0;
			this.setState({currentIndex:0});
		});
	}
	timeupdate=()=>{
		if(!this.Audio){
			return ;
		};
		let {currentTime=0} = this.Audio;
		let getIndexTime = this.findLyricByTime(this.state.currentIndex);
		if(currentTime >= getIndexTime && typeof getIndexTime == "number"){
			this.setState({currentIndex:++this.state.currentIndex});
		};
	}
	findLyricByTime=(currentIndex)=>{
		let {_lyricInfo:{list}} = this.props;
		if(!list.length){
			return null;
		}
		if(currentIndex >= list.length-1){
			return list[list.length-1].time;
		};
		return list[currentIndex+1].time;
		
	}
	isPlayHandler=()=>{
		this.setState({
			isPlay:!this.state.isPlay
		},()=>{
			this.state.isPlay?this.Audio.play():this.Audio.pause();
		})
	}
	
	render(){
		let {isPlay,currentIndex,playlists,similar_Already,simiSongLists,
simiSong_Already}=this.state;
		let {_playerInfo:{nemwxs},_lyricInfo:{list,lyric_Already}} = this.props;
		return ( 
			<div className="songs-page">
				<section className="song-play">
					<div className="s-play-chunk" onClick={this.isPlayHandler}>
						<p className="l-t-logo"><Svg href={require('./images/icon.svg')+`#svg-lt-logo`}/></p>
						<div className={classnames("s-p-box a-circling",{"z-pause":!isPlay})}>
							<div className="s-p-inner">
								<img className="singer-img" src={`${nemwxs.picUrl}?imageView&thumbnail=400x0&quality=75&tostatic=0`} alt=""/>
							</div>
							<p className="s-play-btn"><Svg hash="svg-play-song"/></p>
						</div>
						<i className="needle"></i>
					</div>
					<div className="s-play-info">
						{!!lyric_Already&&<h3>{`${nemwxs.title} - `}<span className="song-autr">{nemwxs.content}</span></h3>}
						<div className="s-play-lyrics">
							<ul className="lyrics-transform" style={this.state.currentIndex>1?{transform:`translateY(-${(currentIndex-1)*30}px)`}:{}}>
								{!lyric_Already?(<li className="lyrics-row">歌词获取中...</li>):(
									
									list.length<=0?(<li className="lyrics-row">暂无歌词...</li>):(
										list.map((k,v)=>{
											return (<li className={classnames("lyrics-row",{active:currentIndex==v})} key={"lyrics"+v}>{k.content}</li>)
										})
									)
								)}
							</ul>
						</div>
						
					</div>
					<i className="song-bg" style={nemwxs.picId_str?{backgroundImage:`url(//music.163.com/api/img/blur/${nemwxs.picId_str})`}:{}}></i>
				</section>
				{!!playlists.length&&<ContainMusic playlists={playlists} similar_Already={similar_Already} {...this.props}/>}
				{!!simiSongLists.length&&<MoreSongsMusic simiSongLists={simiSongLists} simiSong_Already={simiSong_Already} {...this.props}/>}
				<Comments {...this.props}/>
			</div>
			
		);
	}
};



const ContainMusic =({similar_Already,playlists,...other})=>(
	<section className="m-moreLists">
		<PanelNav className="fff" title="包含这首歌的歌单"/>
		<div className="recommend">
			{
			!similar_Already?<Homeremd len={3} />:playlists.map((k,v)=>{
				return (
					<RecommendChunk className="fff" key={k.id} item={{...k,picUrl:k.coverImgUrl}} {...other}/>
				);
			})
			}
		</div>
	</section>
);


const MoreSongsMusic = ({simiSong_Already,simiSongLists,...other})=>(
	<section className="m-moreLists m-moreSongs">
		<PanelNav className="fff" title="喜欢这首歌的人也听"/>
		<div className="simisong-list">
			{
			!simiSong_Already?<Homeremd len={3} />:simiSongLists.map((k,v)=>{
				let {name,album,artists,alias,...other}=k;
				return (
					<Piece item={{...other,name,picUrl:album.blurPicUrl,custom_alia:alias,custom_ar:artists,index:v,...k}} isSerial={2} key={v}/>
				);artists
			})
			}
		</div>
	</section>
);


let mapStateToProps =(state)=>{
	const {server_player_info,lyric_info} = state.songIndex;
	return {_playerInfo:server_player_info,
		_lyricInfo:lyric_info
	};
}; 

let mapDispatchToProps=(dispatch)=>{
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default  connect(mapStateToProps,mapDispatchToProps)(Song);