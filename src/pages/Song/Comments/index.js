/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description： 网易音乐 -- 歌曲播放页 -> 评论模块
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import { Link ,browserHistory } from 'react-router';
import { fetchJson } from 'src/utils/fetch';
import {StaticToast,Svg,PanelNav} from 'src/components/common';
import format from "src/utils/format";


import './Comment.scss';


class Comment extends Component{
	
	state={
		hotComments:[],
		comments:[],total:0
	}
	Audio=null;
 componentDidMount(){
	this.initData();
 }
 initData=()=>{
	fetchJson({
		type:"POST",
		//用户评论 - api
		url:"/musicApi/neteaseMusic/weapi/v1/resource/comments/get",
		data : {
			// offset: 0,
	    resourceId: this.props.params.id,
	    // br:128000,
	    limit:15,
	    resourceType:4,
	    csrf_token: ""
		},
	}).then(res=>{
		if(res.code == 200){
			let {hotComments,comments,total}=res;
			let _c = hotComments.length>=10?[]:comments.slice(0,5);
			this.setState({
				hotComments:hotComments.slice(0,10),
				comments:_c,total
			})
		}else{
			StaticToast.error(res.msg);
		};
	});
 }
 applink=()=>{
 	browserHistory.push({pathname:"/author/works"})
 }
	render(){
		let {hotComments,comments,total}=this.state;
		return ( 
			<section className="m-comments">
				{hotComments.length>0 ? <ListChunk data={hotComments} applink={this.applink} title="精彩评论"/>:null}
				{comments.length>0 && hotComments.length<15? <ListChunk data={comments} title={`最新评论(${total})`} applink={this.applink}/>:null}
				{!!total>0&&<p className="cmt-more"><span onClick={this.applink}>{`查看全部${total}条评论`}</span></p>}
			</section>
		);
	}
};

const ListChunk =({data,title,applink})=>(
	<div>
		<PanelNav title={title}/>
		<ul className="comm-list">
		{
		data.map((k,v)=>{
			return (
				<li className="comm-li" key={k.commentId}>
					<p className="comm-user">
						<Link>
							<img src={`${k.user.avatarUrl.replace(/jpg|png|jpeg/i,'')}webp?imageView&thumbnail=60x0&quality=75&tostatic=0&type=webp`} alt=""/>
						</Link>
					</p>
					<div className="comm-info">
						<div className="cmt-header">
							<div className="cmt-meta">
								<p><Link className="nickname">{k.user.nickname}</Link></p>
								<p className="time">{format.formatMsgTime(k.time)}</p>
							</div>
							<div className="cmt-like" onClick={()=>applink()}>{!!k.likedCount>0&&k.likedCount} <Svg hash={"svg-praise"}/></div>
						</div>
						<div className="cmt-content">{k.content}</div>
					</div>
				</li>
			);
		})
		}
		</ul>
	</div>
	

)

export default Comment;