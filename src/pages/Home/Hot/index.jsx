/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description： 网易音乐 -- 热歌榜
 */

import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classnames from 'classnames';
import { Link ,browserHistory } from 'react-router';
import { fetchJson } from 'src/utils/fetch';
import {StaticToast,Svg} from 'src/components/common';
import format from "src/utils/format";
import actions from "src/store/actions";

import './Hot.scss';


class Hot extends Component{
	static loadData(option) {
    if (option && option.store) {
        return option.store.dispatch(actions.hot_fetch());
    } else {
        this.props.ACTIONS.hot_fetch();
    }
  }
	constructor(props){
		super(props);
    	this.state = {
    	};
	}
	componentDidMount(){
		let {ACTIONS,_hot} = this.props;
		!_hot.tracks.length&&ACTIONS.hot_fetch();
	}
	render(){
		let {_hot} = this.props;
		return ( 
			<section className="i-hot">
				<div className="hot-banner">
					<div className="hot-zindex">
						<div className="hot-banner-icon"></div>
						<p className="hot-update">更新日期:5月24日</p>
					</div>
				</div>
				<ul className="hot-list">
				{
					_hot.tracks.map((k,v)=>{
						let {id,name} = (k.al||{});
						return (
							<li className="li-row-item hot-item" key={id}>
								<Link className="li-row-link">
									<p className={classnames("num",{"num-cred":v<3})}>{format.n(v+1)}</p>
									<div className="li-row-flex">
										<h5 className="name">{name} {k.alia[0]&&<span className="sgalia">({(k.alia[0]||'')})</span>}</h5>
										<p className="brief">{!k.copyright?<Svg hash="svg-hot"/>:null}{format.songArtists(k.ar,k.name)}</p>
									</div>
									<p className="li-row-play-icon"><Svg hash="svg-play"/></p>
								</Link>
							</li>
						);
					})
				}
				</ul>
			</section>
		);
	}
};

function mapStateToProps(state){
	const {server_hot} = state.homeHot;
	return {_hot:server_hot};
}; 

function mapDispatchToProps(dispatch){
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default  connect(mapStateToProps,mapDispatchToProps)(Hot);