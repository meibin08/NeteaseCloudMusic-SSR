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

import format from "src/utils/format";
import actions from "src/store/actions";

import './Author.scss';


class Works extends Component{
	static loadData(option) {
    if (option && option.store) {
        return option.store.dispatch(actions.player_fetch());
    } else {
        this.props.ACTIONS.player_fetch();
    }
  };
  state={
  	isPlay:true,
  	currentIndex:0
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


let mapStateToProps =(state)=>{
	const {server_player_info,lyric_info} = state.songIndex;
	return {_playerInfo:server_player_info,
		_lyricInfo:lyric_info
	};
}; 

let mapDispatchToProps=(dispatch)=>{
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default  connect(mapStateToProps,mapDispatchToProps)(Works);