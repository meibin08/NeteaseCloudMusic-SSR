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
import {StaticToast,Svg,PanelNav} from 'src/components/common';
import format from "src/utils/format";
import actions from "src/store/actions";

import './Home.scss';



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
		let {_playlist,_newsong} = this.props;
		return ( 
			<div className="i-home">
				<PanelNav title="推荐歌单"/>
				<ul className="recommend">
					{
					_playlist.map((k,v)=>{
						
						return (
							<li className="recommend-item" key={k.id}>
								<Link className="re-link">
									<div className="re-briefly">
										<img className="briefly-img" src={k.picUrl} width={122.88} height={122.88} alt={k.name}/>
									</div>
									<p className="shadow-suspend"><Svg hash="svg-earphone"/>{format.units(k.playCount)}</p>
									<p className="re-title">{k.name}</p>
								</Link>
							</li>
						);
					})
					}
				</ul>
				<PanelNav title="最新音乐"/>
				<ul className="newsong">
					{
					_newsong.map((k,v)=>{
						return (
							<li className="newsong-item" key={k.id}>
								<Link className="ns-link">
									<div className="ns-flex">
										<h5 className="name">{k.name}</h5>
										<p className="brief">{k.alg=="hot_server"?<Svg hash="svg-hot"/>:null}{songArtists(k.song.artists,k.name)}</p>
									</div>
									<p className="play-icon"><Svg  hash="svg-play"/></p>
								</Link>
							</li>
						);
					})
					}
				</ul>
			</div>
		);
	}
};
function songArtists(arr=[],name){
	if(!arr){
		return name;
	};
	let result = arr.map((k)=>k.name);
	return `${result.join(" / ")} - ${name}`;
}

function mapStateToProps(state){
	const {server_playlist,newsong} = state.homeIndex;
	// console.log(state.homeIndex)
	return {
		_playlist:server_playlist,
		_newsong:newsong
	};
}; 

function mapDispatchToProps(dispatch){
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default  connect(mapStateToProps,mapDispatchToProps)(Home);