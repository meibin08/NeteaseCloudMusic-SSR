/*
 * @authors :Bin Mei
 * @date    :2018-06-02
 * @description： 共用导航
 */

import React, { Component } from 'react';
import {Link,browserHistory } from 'react-router';
import classnames from 'classnames';
import format from "src/utils/format";
import Svg from '../Svg';

const _WEBP ='.webp?imageView&thumbnail=80x0&quality=75&tostatic=0&type=webp';
class Piece extends Component {
  _onClick=(item)=>{
  	/*sessionStorage.setItem("nemwxs",JSON.stringify({
			content:item.custom_ar[0].name,
			picUrl:item.blurPicUrl,//+"?imageView&thumbnail=400x0&quality=75&tostatic=0",
			resId:item.id,
			picId_str:item.picId_str,
			resType:"song",
			title:item.name
  	}));*/
  	browserHistory.push({pathname:`/song/${item.id}`});
  }
  songArtists=(arr=[],name)=>{
  	if(!arr){
			return name;
		};
		let result = arr.map((k,v)=>k.name);
		let _name_ = result.shift();
		return <em><span className="highlight-name">{_name_}</span>{result.join(" / ")}{` - ${name}`}</em>;
  }
  render() {
  	/*
	   * 参数说明
	   * @ param {String} isSerial 1= Hot.js 页序号; 2= song.js页 喜欢这首歌的人也听 - 头像
	  */
    const {className,item,isSerial=0} = this.props;
    let newPicUrl = (item.picUrl||"").replace(/\.\w+$/,_WEBP);
    let isSQ = item.maxbr>=999000;
    return (
      <section className={classnames("li-row-item hot-item",{[`${className}`]:!!className})} >
				<div className="li-row-link" onClick={()=>this._onClick(item)}>
					{isSerial===1&&<p className={classnames("num",{"num-cred":item.index<3})}>{format.n(item.index+1)}</p>}
					{isSerial===2&&<p className="cover u-cover ">
						<img src={newPicUrl} />
					</p>}
					<div className="li-row-flex">
						<h5 className="name">{item.name} {item.custom_alia[0]&&<span className="sgalia">({(item.custom_alia[0]||'')})</span>}</h5>
						<p className="brief">{!!isSQ?<Svg hash="svg-hot"/>:null}{this.songArtists(item.custom_ar,item.name)}</p>
					</div>
					<p className="li-row-play-icon"><Svg className="c999" hash="svg-play"/></p>
				</div>
			</section>
    )
  }
};

		

export default Piece
