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
  	browserHistory.push({pathname:"/song",query:{id:item.id}});
  }
  render() {
    const {item,isSerial=false} = this.props;
    return (
      <section className="li-row-item hot-item">
				<div className="li-row-link" onClick={()=>this._onClick(item)}>
					{!!isSerial&&<p className={classnames("num",{"num-cred":item.index<3})}>{format.n(item.index+1)}</p>}
					<div className="li-row-flex">
						<h5 className="name">{item.name} {item.custom_alia[0]&&<span className="sgalia">({(item.custom_alia[0]||'')})</span>}</h5>
						<p className="brief">{!item.copyright?<Svg hash="svg-hot"/>:null}{format.songArtists(item.custom_ar,item.name)}</p>
					</div>
					<p className="li-row-play-icon"><Svg className="c999" hash="svg-play"/></p>
				</div>
			</section>
    )
  }
}

export default Piece
