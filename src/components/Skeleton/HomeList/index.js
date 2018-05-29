
/*
 * @authors :Bin Mei
 * @date    :2018-05-28
 * @description：网易云音乐 - 推荐音乐 - 最新音乐、热歌榜
 */
import React, { Component } from 'react';
import './HomeList.scss';

class HomeList extends Component {
  
  render() {
    let {len=6}=this.props;
    let chunkArr = Array.from(new Array(len),(val,index)=>index+1);
    return (
      <ul className="list-song-skeleton">
      {chunkArr.map((k,v)=>{
        return (
          <li className="sk-song-item" key={v+"skeleton"}>
            <p className="row"></p>
            <p className="play"></p>
          </li>
        );
      })}
      </ul>
    )
  }
}

export default HomeList;