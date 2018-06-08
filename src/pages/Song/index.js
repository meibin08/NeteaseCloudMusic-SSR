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
import {StaticToast,Svg} from 'src/components/common';
import {HomeList} from 'src/components/Skeleton';

import format from "src/utils/format";
import actions from "src/store/actions";

import './Song.scss';


class Song extends Component{
	static loadData(option) {
    if (option && option.store) {
        return option.store.dispatch(actions.player_fetch());
    } else {
        this.props.ACTIONS.player_fetch();
    }
  };
  state={
  	isPlay:true,
  	currentIndex:0
  }
  Audio=null;
  
	componentDidMount(){
		let {ACTIONS,location:{query}} = this.props;
		let options={id:query.id};
		ACTIONS.player_fetch(options).then((res)=>{
			this.initAudio(res.data[0].url);
		});
		ACTIONS.getLyric(options);
		ACTIONS.song_detail(options);
	}
	componentWillUnmount(){
		this.Audio.pause();
		this.Audio=null;
	}
	initAudio=(src)=>{
		this.Audio = new Audio(src);
		this.Audio.autoplay =true;
		
		//歌曲播放中
		this.Audio.addEventListener("timeupdate",()=>{ 
			let {currentTime} = this.Audio;
			let getIndexTime = this.findLyricByTime(this.state.currentIndex);
			if(currentTime >= getIndexTime && typeof getIndexTime == "number"){
				this.setState({currentIndex:++this.state.currentIndex});
			};
		});

		//歌曲结束
		this.Audio.addEventListener("ended",()=>{
			// this.Audio.pause();
			this.isPlayHandler();
			this.setState({currentIndex:0});
		});
	}
	findLyricByTime=(currentIndex)=>{
		let {_lyricInfo:{list}} = this.props;
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
		let {isPlay,currentIndex}=this.state;
		let {_playerInfo:{nemwxs},_lyricInfo:{list,lyric_Already}} = this.props;
		return ( 
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
					<h3>{`${nemwxs.title} - `}<span className="song-autr">{nemwxs.content}</span></h3>
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
		);
	}
};

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