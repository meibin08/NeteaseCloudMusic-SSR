/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description： 网易音乐 -- 搜索
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
import { Icon, Grid } from 'antd-mobile';

import './Search.scss';

class Search extends Component{
	constructor(props){
		super(props);
    	this.state = {
    	};
	}
	componentDidMount(){
		let {ACTIONS,_search} = this.props;
		!_search.list.length&&ACTIONS.search_fetch();
	}
	render(){
		let {_search:{list}}=this.props;
		return ( 
			<section className="i-search">
				<form className="i-search-column" action="#" method="get">
					<p className="inputcover">
						<input type="text" className="inpuver" placeholder="搜索歌曲、歌手、专辑"/>
						<Svg hash="svg-search"/>
						<Icon className="cross-circle" type='cross-circle-o' />
					</p>
				</form>
				<div className="s-hot-column">
					<h5 className="tit">热门搜索</h5>
					<section className="s-hot-tag">
						{list.map((k,v)=>{
							return (
								<span key={`${v+k.second}`} className="s-item-tag">{k.first}</span>
							);
						})}
					</section>
				</div>
				<ul className="s-hot-history">
					<li className="hist-item">
						<p className="time"><Svg href={`${require('./images/icon.svg')}#svg-time`}/></p>
						<div className="hist-text">热门搜索</div>
						<p className="close"><Icon className="cross" type='cross' /></p>
					</li>
				</ul>
			</section>
		);
	}
};

function mapStateToProps(state){
	const {server_search} = state.homeSearch;
	return {_search:server_search};
}; 

function mapDispatchToProps(dispatch){
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default  connect(mapStateToProps,mapDispatchToProps)(Search);