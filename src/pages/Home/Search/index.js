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
		// searchTxt:"",
		// isSearch:false,
		// searchResult:[],
		allMatch:[] //搜索关键字
	}
	_query_:null;
	componentDidMount(){
		this._query_ = mTools.throttle(this._query, 600);
		let {ACTIONS,_search} = this.props;
		!_search.list.length&&ACTIONS.search_fetch();
	}
	searchInpuver=(searchTxt)=>{
		let {ACTIONS}=this.props;
		ACTIONS.set({searchTxt});
		if(this.state.searchTxt !== ''){
			this._query_(searchTxt);
		}
	}
	clear=()=>{
		this.props.ACTIONS.set({searchTxt:"",isSearch:false});
	}
	_query = (val)=>{
		console.log("val",val)
		let {searchTxt,ACTIONS}=this.props;
		fetchJson({
			type:"POST",
			url:`/musicApi/neteaseMusic/weapi/search/suggest/keyword`,
			data : {
				s: searchTxt
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
	//点击标签搜索
	tagSearch=(searchTxt)=>{
		let {ACTIONS}=this.props;
		ACTIONS.set({searchTxt,isSearch:true});
		this.props.ACTIONS.search(searchTxt);
	}
	render(){
		let {_search:{list},_sResult,searchTxt,isSearch}=this.props;
		let {allMatch}=this.state;

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
					isSearch ? <Results song_Already={_sResult.song_Already} list={_sResult.list} {...this.props}/> : (<section className="s-all-match">
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
const Results =({song_Already,list=[]})=>(
	<ul className="s-sglst">
		{
		!song_Already?<HomeList len={4}/>:(list.length>0?list.map((k,v)=>{
			let {album,privilege:{maxbr=0},ar,alias=[],...other}=k;
			return (
				<Piece item={{...other,maxbr,custom_alia:alias,custom_ar:[ar[0]],index:v,...k}} key={v}/>
			);
		}):null)
		}
	</ul>
);

function mapStateToProps(state){
	const {server_search,searchResult,searchTxt,isSearch} = state.homeSearch;
	return {_search:server_search,_sResult:searchResult,searchTxt,isSearch};
}; 

function mapDispatchToProps(dispatch){
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default  connect(mapStateToProps,mapDispatchToProps)(Search);