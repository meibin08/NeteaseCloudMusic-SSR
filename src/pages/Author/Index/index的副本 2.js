/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description： 网易音乐 -- 更多示例
 */

import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classnames from 'classnames';
import { Link ,browserHistory } from 'react-router';
import { fetchJson } from 'src/utils/fetch';
import {StaticToast,Svg,PanelNav} from 'src/components/common';
import update from 'immutability-helper';
import { updateIn,List,merge,Map,Set,get,getIn,fromJS } from 'immutable';
import format from "src/utils/format";
import actions from "src/store/actions";

import './Author.scss';


class Works extends Component{

	state={
		isPlay:true,
		currentIndex:0
	}
	componentDidMount(){
	
	let arr = [1,2,3,4,5,6];
	let obj={
		name:"immutable",
		children:{
			address:"ShenZhen",
			hobby:"写博客",
			array:["我不是程序员","切图崽了解一下"],

		}
	};
	let obj2 = update(obj,{
		$merge:{
			arr
		},
		children:{
			array:{
				$merge:{items:["从前有坐山","山里有个庙"]},
				$splice:[[0,0,"住着一个小和尚"]]

			}
		}

	});
	console.log("原始数据:",obj);
	console.log("obj2:",obj2);
	



	}
	render(){
		let {isPlay,currentIndex}=this.state;
		return ( 
			<div>
				作者
			</div>
			
		);
	}
};

export default Works;