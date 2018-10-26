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
import { List,merge,Map,Set,get,getIn,fromJS } from 'immutable';
import format from "src/utils/format";
import actions from "src/store/actions";

import './Author.scss';


class Works extends Component{

	state={
		isPlay:true,
		currentIndex:0
	}
	componentDidMount(){

		const data = Map({
			a:1,
			b:2,
			children:{
				name:"苏南",
				organization:"@IT·平头哥联盟",
				job:"首席填坑官",
				age:18
			}
		});
		const data2 = data.merge({'b': 50});
		console.log("这里是由Map创建的数据：",data2);
		console.log("这里是的子级对象用Map创建",data2.get('children'));

		const list1 = List([ 1, 2, 3 ]);
		const list2 = List([ 4, 5, 6 ]);
		const array = [ 7, 8, 9 ];
		const list3 = list1.concat(list2, array);
		console.log(list3.get(0)) // List {size: 9, _origin: 0, _capacity: 9, _level: 5, _root: null, …}
		/*const map1 = Map({ a: 1, b: 2, c: 3, d: 4 });
		const map2 = Map({ c: 10, a: 20, t: 30 });
		const obj = { d: 100, o: 200, g: 300 };
		const map3 = map1.merge(map2, {obj});*/

		return ;

		/*let data = {
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
	let data2 = update(data,{
		b:{
			$set:666,
		},
		children:{
			$merge:{age:28,job:"首席甩锅官"}
		}
	});
console.log("data:",data);
console.log("data2:",data2)*/
	



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