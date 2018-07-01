/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description： 网易音乐 -- 推荐音乐
 */

import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classnames from 'classnames';
import { Link ,browserHistory } from 'react-router';
import { Grid,Button } from 'antd-mobile';
import { fetchJson } from 'src/utils/fetch';
import {StaticToast,Svg,PanelNav,Piece,RecommendChunk} from 'src/components/common';
import {Homeremd,HomeList} from 'src/components/Skeleton';
import format from "src/utils/format";
import actions from "src/store/actions";

import './Home.scss';



const _WEBP ='.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp';
class Home extends Component{
	static loadData(option) {
    if (option && option.store) {
        return option.store.dispatch(actions.playlist_fetch());
    } else {
        this.props.ACTIONS.playlist_fetch();
    }
  }

	componentDidMount(){
		let {_playlist,ACTIONS}=this.props;
    !_playlist.length&&ACTIONS.playlist_fetch();
		ACTIONS.newsong();
	}
	render(){
		let {_playlist,_newsong,playlist_Already,song_Already} = this.props;
		return ( 
			<div className="i-home">
				<PanelNav title="推荐歌单"/>
				<section className="recommend">
					{
					!playlist_Already?<Homeremd len={6} />:_playlist.map((k,v)=>{
						return (
							<RecommendChunk key={k.id} item={k} {...this.props}/>
						);
					})
					}
				</section>
				<PanelNav title="最新音乐"/>
				<ul className="newsong">
					{
					!song_Already?<HomeList/>:_newsong.map((k,v)=>{
						let {album,privilege:{maxbr},artists,alias,...other}=k.song;
						return (
							<Piece item={{...other,maxbr,custom_alia:alias,custom_ar:artists,index:v,...k}} key={v}/>
						);
					})
					}
				</ul>
			</div>
		);
	}
};
// <li className="li-row-item newsong-item" key={k.id}>
// 								<Link className="li-row-link" to={{pathname:"/song",query:{id:k.id}}}>
// 									<div className="li-row-flex">
// 										<h5 className="name">{k.name}</h5>
// 										<p className="brief">{k.alg=="hot_server"?<Svg hash="svg-hot"/>:null}{format.songArtists(k.song.artists,k.name)}</p>
// 									</div>
// 									<p className="li-row-play-icon"><Svg className="c999" hash="svg-play"/></p>
// 								</Link>
// 							</li>
function mapStateToProps(state){
	const {server_playlist,newsong,playlist_Already,song_Already} = state.homeIndex;
	// console.log(state.homeIndex)
	return {
		_playlist:server_playlist,
		_newsong:newsong,playlist_Already,song_Already
	};
}; 

function mapDispatchToProps(dispatch){
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default  connect(mapStateToProps,mapDispatchToProps)(Home);