
/*
 * @authors :Bin Mei
 * @date    :2018-05-28
 * @description：网易云音乐 - 推荐音乐 - 推荐歌单
 */
import React, { Component } from 'react';
import './Homeremd.scss';

class Homeremd extends Component {
  
  render() {
    let {len=6}=this.props;
    let chunkArr = Array.from(new Array(len),(val,index)=>index+1);
    return (
      <ul className="recommend-skeleton">
      {chunkArr.map((k,v)=>{
        return (
          <li className="sk-item" key={v+"skeleton"}>
            <p className="square"></p>
            <p className="line"></p>
          </li>
        );
      })}
      </ul>
    )
  }
}

export default Homeremd;