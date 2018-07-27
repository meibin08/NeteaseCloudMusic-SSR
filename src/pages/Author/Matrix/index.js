/*
 * @authors :Bin Mei
 * @date    :2017-07-27
 * @description： 网易音乐 -- 自定义距阵
 */

import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classnames from 'classnames';
import { Link  } from 'react-router';
import { fetchJson } from 'src/utils/fetch';
import {StaticToast,Svg,PanelNav} from 'src/components/common';
import format from "src/utils/format";
import actions from "src/store/actions";
import update from 'immutability-helper';
import './Matrix.scss';


// fake data generator
const getItems = (count, offset = 0) =>
	Array.from({ length: count }, (v, k) => k).map(k => ({
		id: `item-${k + offset}`,
		content: `item ${k + offset}`
	}));

const getItems2 = (count) =>{
	let arr = Array.from({ length: count }, (v, k) => ({uid: format.guid(),size:60,}));
	return arr.map((k,index) => ({
		uid: format.guid(),
		size:60,
		children: Array.from({ length: count }, (v, k)=>({k}))
	}));
};

const tableData=(()=>getItems2(4))();

class Works extends Component{
	
  state={
		tableData,record:0,
		pointEnd:{row:0,col:0},
		pointStart:{row:0,col:0},
  }
  clearMatrix=(callback)=>{
		let {tableData} = this.state;
		tableData.map((k)=>{
			k.children.map(v=>{
				v.selected=false;
				return v;
			})
			return k;
		})
		this.setState({tableData},()=>callback())
	}
	renderActiveCube=()=>{
		let {pointEnd,pointStart}=this.state;
		let  maxRow = Math.max(pointStart.row, pointEnd.row);
		let  maxCol = Math.max(pointStart.col, pointEnd.col);
		this.clearMatrix(()=>{
			for(var i=0;i<=maxRow;i++){
				for(var j=0;j<=maxCol;j++){
			
					this.state.tableData[i]["children"][j]["selected"] = true;
					this.setState(update(this.state.tableData,{
						[i]:{
							children:{
								[j]:{
									$merge:{"selected":true}
								}
							}
						}
					}))
					// this.setState({tableData:this.state.tableData})
				}

			}
		})
	}
	enter=(row,col)=>{
		let {record}=this.state;
		if(record){
			// console.log(row,col)
			this.setState({
				pointEnd:{row,col}
			},()=>{
				this.renderActiveCube()
			})
		};
	}
	handlerClick=(row,col)=>{
		let {record}=this.state;
		if(!record){ //结束
			this.setState({
				pointStart:{row,col},record:1
			})
			return ;
		};
		this.setState({
			pointEnd:{row,col},record:0
		})
	}
  tdHtml=(child,row, count) =>{
		return child.map((k,index) => (<td key={k.uid} style={{width:80,height:80}} className={classnames({"hover":!!k.selected,})} onMouseEnter={()=>this.enter(row,index)} onClick={()=>this.handlerClick(row,index)} key={`td${index}`}>{`${row}行${index}列`}</td>))
	}
	render(){
		let {tableData}=this.state;
		return ( 
			<div className="matrix-main">
				<table>
					<tbody>
					{
					tableData.map((k,v)=>{
						return (
							<tr key={k.uid} >
								{this.tdHtml(k.children,v)}
							</tr>
						)
					})
					}
					</tbody>
				</table>
			</div>
			
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
export default  connect(mapStateToProps,mapDispatchToProps)(Works);