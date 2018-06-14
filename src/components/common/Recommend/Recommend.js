/*
 * @authors :Bin Mei
 * @date    :2018-06-09
 * @description： 共用推荐模块
 */

import React, { Component } from 'react';
import {Link,browserHistory } from 'react-router';
import classnames from 'classnames';
import format from "src/utils/format";
import Svg from '../Svg';

const _WEBP ='.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp';
class Recommend extends Component {
  
  render() {
    const {item,className} = this.props;
		let newPicUrl = item.picUrl.replace(/\.\w+$/,_WEBP);
    return (
      <div className={classnames("recommend-item",{[`${className}`]:!!className})} key={item.id}>
				<Link className="re-link">
					<div className="re-briefly">
						<img className="briefly-img" src={newPicUrl} width={122.88} height={122.88} alt={item.name}/>
					</div>
					<p className="shadow-suspend"><Svg hash="svg-earphone"/>{format.units(item.playCount)}</p>
					<p className="re-title">{item.name}</p>
				</Link>
			</div>
    )
  }
}

export default Recommend
