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
import { List,merge,Map, Set,get,getIn,fromJS } from 'immutable';
import format from "src/utils/format";
import actions from "src/store/actions";

import './Author.scss';


class Works extends Component{

	state={
		isPlay:true,
		currentIndex:0
	}
	componentDidMount(){

		let data = {
    a:1,
    b:2,
    children:{
      name:"苏南",
      organization:"@IT·平头哥联盟",
      job:"首席填坑官",
      address:"ShenZhen",
      age:18
    }
  };
  let data2 = Object.assign({},data);
  data2.children.age = 28;
  data2.children.job = "首席甩锅官";
  data2.b = 666;
  console.log("我是原始数据 data:",data);
  console.log("我是复制后的数据 data2:",data2);
  let initState = fromJS({
  	list:List(),
  	Obj:{},
  })
	const plainSet = Set([ 1, 2, 3, 4 ])
	let listFromPlainSet = List(plainSet);
	initState.mergeIn(["Obj"],data);
	listFromPlainSet.set(1,4);
	let immutableData2 = Map({});
	// merge(immutableData2,data2);
	console.log(initState.get("Obj"))


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