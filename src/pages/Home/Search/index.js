/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description： 网易音乐 -- 搜索
 */

import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classnames from 'classnames';
import { Link ,browserHistory } from 'react-router';
import { fetchJson } from 'src/utils/fetch';
import {StaticToast,Svg,Piece} from 'src/components/common';
import format from "src/utils/format";
import mTools from "src/utils/tool";
import actions from "src/store/actions";
import { Icon, Grid } from 'antd-mobile';
import {HomeList} from 'src/components/Skeleton';

import './Search.scss';

class Search extends Component{
	state={
		searchTxt:"",
		isSearch:false,
		song_Already:false,
		searchResult:[],
		allMatch:[] //搜索关键字
	}
	_query_:null;
	componentDidMount(){
		this._query_ = mTools.throttle(this._query, 600);
		let {ACTIONS,_search} = this.props;
		!_search.list.length&&ACTIONS.search_fetch();
	}
	searchInpuver=(searchTxt)=>{
		this.setState({searchTxt},()=>{
			if(this.state.searchTxt !== ''){
				this._query_();
			}
		})
	}
	clear=()=>{
		this.setState({searchTxt:"",isSearch:false});
	}
	_query = ()=>{
		
		fetchJson({
			type:"POST",
			url:`/musicApi/neteaseMusic/weapi/search/suggest/keyword`,
			data : {
				s: this.state.searchTxt
			}
		}).then(res=>{
			if(res.code === 200){
				// console.log(res);
				let {allMatch=[]}=res.result;
				this.setState({allMatch});
				return ;
			};
			res.error&&StaticToast.error(res.error);
		});
	}
	search=()=>{
		
		fetchJson({
			type:"POST",
			url:`/musicApi/neteaseMusic/weapi/search/get`,
			data : {
				csrf_token: "",
				limit:30,
				type:1,
				queryCorrect:true,
				strategy:5,
				s: this.state.searchTxt,
				offset:0, //页数 1*30
			}
		}).then(res=>{
			if(res.code === 200){
				console.log(res);
				let {songs} = res.result;
				let searchResult = [].concat(this.state.searchResult,songs);
				this.setState({searchResult,song_Already:true})
				return ;
			};
			res.error&&StaticToast.error(res.error);
		});
	}
	//点击标签搜索
	tagSearch=(searchTxt)=>{
		this.setState({searchTxt,isSearch:true},()=>{this.search()});
	}
	render(){
		let {_search:{list}}=this.props;
		let {searchTxt,isSearch,song_Already,searchResult,allMatch}=this.state;

		return ( 
			<section className="i-search">
				<form className="i-search-column" action="#" method="get" onSubmit={()=>{}}>
					<p className="inputcover">
						<input type="text" className="inpuver" value={searchTxt} onChange={(e)=>this.searchInpuver(e.target.value)} placeholder="搜索歌曲、歌手、专辑"/>
						<Svg hash="svg-search"/>
						{!!searchTxt&&<Icon className="cross-circle" type='cross-circle-o' onClick={()=>this.clear()} />}
					</p>
				</form>
				{searchTxt===""?(
					<section className="hot-default">
						<div className="s-hot-column">
							<h5 className="tit">热门搜索</h5>
							<section className="s-hot-tag">
								{list.map((k,v)=>{
									return (
										<span key={`${v+k.second}`} className="s-item-tag" onClick={()=>this.tagSearch(k.first)}>{k.first}</span>
									);
								})}
							</section>
						</div>
						<ul className="s-hot-history">
							<li className="hist-item">
								<p className="time"><Svg href={`${require('./images/icon.svg')}#svg-time`}/></p>
								<div className="hist-text">热门搜索</div>
								<p className="close"><Icon className="cross" type='cross' /></p>
							</li>
						</ul>
					</section>
					):(
					isSearch ? <Results song_Already={song_Already} list={searchResult} /> : (<section className="s-all-match">
						<h4 className="s-match-key s-fd">{`搜索"${searchTxt}"`}</h4>
						<ul>
							{allMatch.map((k,v)=>{
								return (
									<li className="recomitem" key={v} onClick={()=>this.tagSearch(k.keyword)}>
										<p><Svg hash="svg-search"/></p>
										<p className="s-fd">{k.keyword}</p>
									</li>
								);
							})}
						</ul>
					</section>)
					)}
			</section>
		);
	}
};
const Results =({song_Already,list})=>(
	<ul className="s-sglst">
		{
		!song_Already?<HomeList len={4}/>:list.map((k,v)=>{
			let {album,privilege:{maxbr},ar,alias=[],...other}=k;
			return (
				<Piece item={{...other,maxbr,custom_alia:alias,custom_ar:[ar[0]],index:v,...k}} key={v}/>
			);
		})
		}
	</ul>
);

function mapStateToProps(state){
	const {server_search} = state.homeSearch;
	return {_search:server_search};
}; 

function mapDispatchToProps(dispatch){
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default  connect(mapStateToProps,mapDispatchToProps)(Search);