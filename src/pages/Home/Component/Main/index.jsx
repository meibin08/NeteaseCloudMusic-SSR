/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description： 首页共用头部
 */

import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classnames from 'classnames';
import { Link ,browserHistory } from 'react-router';
import { fetchJson } from 'src/utils/fetch';
import {Navigation,Footer} from 'src/components/common';
import format from "src/utils/format";
import actions from "src/store/actions";
import { Tabs } from 'antd-mobile';


import './Main.scss';



class Main extends Component{
	_tabs = [
	  { title: "推荐音乐" ,pathname:"/music" },
	  { title: "热歌榜",pathname:"/hot"},
	  { title: "搜索",pathname:"/search"}
	];
	render(){
		return ( 
			<section className="i-main">
				<header className="header">
					<div className="header-content">
						<Navigation />
						<ul className="custom-tabs">
							{this._tabs.map((item,v)=><li key={'tabs'+v} className="tab-item"><Link className="tab-item-link" to={{pathname:`${item.pathname}`}} activeClassName="active">{item.title}</Link></li>)}
						</ul>
					</div>
					</header>
				<div className="i-children" style={{minHeight:358}}>{this.props.children}</div>
				<Footer/>
			</section>
		);
	}
};


let mapStateToProps =(state)=>{
	return {};
}; 

let mapDispatchToProps=(dispatch)=>{
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default  connect(mapStateToProps,mapDispatchToProps)(Main);