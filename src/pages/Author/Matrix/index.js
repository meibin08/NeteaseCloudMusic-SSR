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
import { Flex, WhiteSpace,Button,Slider } from 'antd-mobile';
import './Matrix.scss';

const defaultImg = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const  getArr = (count)=>Array.from({ length: count }, (v, k)=>(0));
const imgArr = [
	"https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/05/0C/ChMkJldVDcWILe4SAAkktaaTEpgAASUZQOk_WgACSTN454.jpg",
	"http://img.boqiicdn.com/Data/BK/A/1403/11/img90041394506415_y.jpg",
	"http://www.yldon.com/upload/9/80/9803fe360373830a8341e1ac4ca14315.jpg",
	"https://img.yzcdn.cn/upload_files/2018/07/04/FphVKll_v2jKxxPsum7v9gHW-gwC.jpg",
	"https://img.yzcdn.cn/upload_files/2018/07/04/FlZ4d42m_2CL_axf7oQmouqjEtDd.jpeg",
	"https://img.yzcdn.cn/upload_files/2018/07/04/FjArTwlH6ZGIcBP6-Fgj2GkQyMw-.jpeg"];
const getItems = (count) =>
	getArr(count).map((k,index) => ({
		uid: `${format.guid()}`,
		label: `${count+index}x${count+index}`,
		value:(count+index)
	}));

//生成格子密度
const getDensityGrid = (count) =>{
	return getArr(count).map((k,index) => (getArr(count)));
};

class Works extends Component{
	
  state={
		tableData:getDensityGrid(4),record:0,
		shortMatix:{},//暂时点击的下标
		pointEnd:{row:0,col:0},
		pointStart:{row:0,col:0},
		result:[],
		cubeGap:0,//图片间隔
		gridsNum:4, //网格数量 4x4
		// lattice:
		layoutW:320,//布局宽度，以它为基准
		gridsSize:80,
		screenW:750 ,
		previewUpdate:format.guid(),
  }
  //选择布局
  selectGrid=(e)=>{
  	let {value}=e.target;
  	this.setState(update(this.state,{
  		tableData:{
  			$set:getDensityGrid(value)
  		},
  		result:{$set:[]},
  		gridsNum:{$set:value},
  		gridsSize:{$set:(this.state.layoutW/value)},
  	}));
  	console.log(e.target.value);

  }
  rowHtml=(child,row, count) =>{
  	let {shortMatix,gridsSize}=this.state;
		return child.map((k,index) => (
			<td key={format.guid()} 
				style={{width:gridsSize,height:gridsSize}} 
				className={classnames({"selected":2 === k,"hover":1 === k,short:(shortMatix.row===row&&shortMatix.col===index)})} 
				onMouseEnter={()=>this.tdMouseOver(row,index)} 
				onClick={()=>2 !== k ? this.tdClick(row,index):null} key={`td${index}`}>
			<p className="scale">{`${row}行${index}列`}</p></td>
		))
	}
	//从table上离开，清除之前未完成的操作
	clearTableMatrix=()=>{ 
		this.setState(update(this.state,{
			shortMatix:{$set:{}},
			record:{$set:0},
			tableData:{$set:this.clearTdHoverMatrix(this.state.tableData)}
		}));
	}
  //清除td的hover记录
  clearTdHoverMatrix=(data)=>{
		return data.map((item,v)=> {
        return item.map((k,index)=>{
            return 2 === k ? k : 0;
        })
    })
	}
	//td点击开始与结束的操作
	tdClick=(row,col)=>{
		let {record}=this.state;
		if(!record){ //开始
			this.setState(update(this.state,{
				pointStart:{
					$set:{row,col}
				},
				shortMatix:{
					$set:{row,col}
				},
				record:{
					$set:1
				}
			}),()=>this.tdMouseOver(row,col));
			return ;
		};
		this.setState(update(this.state,{
			pointEnd:{
				$set:{row,col}
			},
			record:{
				$set:0
			}
		}),()=>{
			this.tdSureClick(this.state.tableData);
			this.renderActiveCube('chose');
		})
	}
	//鼠标经过 td 的操作
	tdMouseOver=(row,col)=>{
		let {record}=this.state;
		if(record){
			this.setState(update(this.state,{
				pointEnd:{
					$set:{row,col}
				}
			}),()=>{
				this.renderActiveCube('hover')
			})
		};
	}
	//重绘选择的记录
	renderActiveCube=(type="hover")=>{
		let {pointEnd,pointStart}=this.state;
		let  maxRow = Math.max(pointStart.row, pointEnd.row);
		let  maxCol = Math.max(pointStart.col, pointEnd.col);
		let  minRow = Math.min(pointStart.row, pointEnd.row);
		let  minCol = Math.min(pointStart.col, pointEnd.col);
		let tableData = this.state.tableData;
		//清除之前的记录，重新标记
		if("hover" === type){
			tableData = this.clearTdHoverMatrix(this.state.tableData);
		};
		for(var i=minRow;i<=maxRow;i++){
			for(var j=minCol;j<=maxCol;j++){
				let itemCol = tableData[i][j];
				if(itemCol === 2){
				// console.log(type,`第${i}行，${j}列`,tableData[i])
					return ;
				};
				tableData = update(tableData,{
					[i]:{
						[j]:{
							$set:("hover" === type ) ? (0 === itemCol  ? 	1 	: 	itemCol) : (1 === itemCol ? 2 : 1)
						}
					}
				});
			}
		}
		this.setState({tableData});
	}
	//确认选择
	tdSureClick=(tableData)=>{
		let options = {};
		let record = 1;
		for(var i=0;i<tableData.length;i++){
			for(var j=0;j<tableData[i].length;j++){
				let itemCol = tableData[i][j];
				if(itemCol===1){
					options[`${record?'pointStart':'pointEnd'}`]={row:i,col:j};
					record = 0;
					// console.log("行列:",tableData[i],i)
				}
				tableData = update(tableData,{
					[i]:{
						[j]:{
							$set:(itemCol>=1 ? 2 : 0)
						}
					}
				});
			}
		}
		this.changeCube(options);
		this.setState({tableData});
	}
	changeCube=(options={})=>{
		let {gridsNum,layoutW,screenW,gridsSize} = this.state;
		let screenSize = screenW/gridsNum;

		let layoutStyle = {width:gridsSize,height:gridsSize};
		let itemResult ={gridsNum,layoutStyle,url:"",message:""};
		let {pointStart,pointEnd=this.state.pointEnd}=options;
		let  maxRow = Math.max(pointStart.row, pointEnd.row);
		let  maxCol = Math.max(pointStart.col, pointEnd.col);
		let  minRow = Math.min(pointStart.row, pointEnd.row);
		let  minCol = Math.min(pointStart.col, pointEnd.col);
		let rowNum = (maxRow-minRow+1);//行数
		let colNum = (maxCol-minCol+1);//列数

		layoutStyle.top = (minRow)*gridsSize;
		layoutStyle.left = (minCol)*gridsSize;
		layoutStyle.width = (colNum*gridsSize);
		layoutStyle.height = (rowNum*gridsSize);
		itemResult.layoutStyle =layoutStyle;
		itemResult.message = `${Math.ceil(colNum*screenSize)}x${Math.ceil(rowNum*screenSize)}像素`;
		itemResult.selected = 1;

		this.setState(update(this.state,{
			result:{
				$set:[...this.state.result.map((k)=>{k.selected=0;return k}),itemResult]
			}
		}))
	}
	selectCubeEdit = (index)=>{

		this.setState(update(this.state,{
			result:{
				$set:this.state.result.map((k,v)=>{k.selected=(v===index?1:0);return k})
			}
		}))
	}
	upload=()=>{

		this.setState(update(this.state,{
			previewUpdate:{$set:format.guid()},
			result:{
				$set:this.state.result.map((k,v)=>{
					if(k.selected){
						k.url = imgArr[Math.floor(Math.random()*imgArr.length)];
					};
					return k
				})
			}
		}))
		
	}
	cubeGapSet = (value)=>{
		this.setState(update(this.state,{
			cubeGap:{
				$set:value
			}
		}))
	}

	render(){
		let {tableData,result,gridsNum,cubeGap}=this.state;

		return ( 
			<section className="matrix-main">
				<p>预览区：</p>
				<br/>
      	<Preview {...this.state} {...this.props}/>
				 <div className="cube-editor">
	      	<p>编辑区：</p>
	      	<br/>
	      	<Flex>
			      <Flex.Item>魔方密度：</Flex.Item>
			      <Flex.Item> 
			      	<select value={gridsNum} onChange={(e)=>this.selectGrid(e)}>
			      		{getItems(4).map((k,v)=>(<option value={k.value} key={k.uid}>{k.label}</option>))}
			      	</select> 
			      </Flex.Item>
			    </Flex>
			    <br/>
			    <br/>
					<div className="cube-layout">
						<table onMouseLeave={()=>this.clearTableMatrix()}>
							<tbody>
							{
							tableData.map((k,v)=>{
								return (
									<tr key={format.guid()} >
										{this.rowHtml(k,v)}
									</tr>
								)
							})
							}
							</tbody>
						</table>
						{result.map((k,v)=>{
							let {layoutStyle,message} = k;
							return (
								<div className={classnames("cube-item",{"active":!!k.selected})} key={format.guid()} onClick={()=>this.selectCubeEdit(v)} style={layoutStyle}>
									<div className="cube-selected-text">{message}<p>或同等比例</p></div>
								</div>
							)
						})}
					</div>
					<br/>
					<Flex>
						<p>间隔：</p>
						<Flex.Item>
							<Slider
		            style={{ margin: '0 5px'}}
		            value={cubeGap}
		            min={0}
		            max={10}
		            onChange={(value)=>this.cubeGapSet(value)}
		          />
						</Flex.Item>
					</Flex>
			    <br/>
			    <Button type="primary" onClick={()=>this.upload()}>添加/替换图片</Button>
	      </div>
			</section>
			
		);
	}
};
const pretendScreen = 640;//设备宽度
class Preview extends Component{
	state={
		screenW:pretendScreen/2,
		gridsSize:Math.floor(pretendScreen/this.props.gridsNum)
	}
	shouldComponentUpdate(nextProps, nextState) { 
		return ( (nextProps.cubeGap !== this.props.cubeGap) || (nextProps.result.length!== this.props.result.length) || nextProps.previewUpdate !== this.props.previewUpdate);
	}
	conversionSize=(layoutStyle={},halfGap=0)=>{
		let {layoutW} = this.props; //参考基准
		let {screenW,gridsSize} = this.state;
		let proportion =(screenW)/layoutW; //当前设备宽度/编辑模块基础的宽度
		let result = {};
		if( halfGap>0){
				result['left'] = Math.floor((layoutStyle['left']*proportion)+(layoutStyle['left']>0?halfGap:0));
				result['top'] = Math.floor((layoutStyle['top']*proportion)+(layoutStyle['top']>0?halfGap:0));
				result['width'] = Math.floor((layoutStyle['width']*proportion)-(layoutStyle['left']>0?halfGap:0));
				result['height'] = Math.floor((layoutStyle['height']*proportion)-(layoutStyle['top']>0?halfGap:0));
		}else{
			for(var key in layoutStyle){
				result[key] = Math.floor(layoutStyle[key]*proportion);
			};
		};
		return result;
	}
	render(){
		let {screenW}=this.state;
		let {result=[],cubeGap=0} = this.props;
		let halfGap = Math.floor(cubeGap/2);//一半间隔
		return (
			<div className="cube-preview" style={{width:screenW+2}}>
				<img src="https://img.yzcdn.cn/public_files/2017/12/15/c16b686fda5bc8b2c607f8c64edbef6c.png" alt=""/>
				<div className="cube-wrap">
					<ul className="preview-cube" style={{height:screenW+cubeGap,width:screenW+cubeGap,margin:`-${halfGap}px`}}>
						{result.map((k,v)=>(
							<li key={format.guid()} className="p-cube-item" style={{...this.conversionSize(k.layoutStyle,halfGap),backgroundImage: `url(${k.url||defaultImg})`,margin:halfGap}}>
								<p className="borde" style={{borderWidth:halfGap}}></p>
							</li>))}
					</ul>
				</div>
			</div>
		)
	}
}

let mapStateToProps =(state)=>{
	return {};
}; 

let mapDispatchToProps=(dispatch)=>{
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default  connect(mapStateToProps,mapDispatchToProps)(Works);
