/*
 * @authors :Bin Mei
 * @date    :2017-06-06
 * @description：网易音乐 -- 关于作者相关
 */

import bridge from 'src/utils/bridge';

module.exports = [
	{
		path: 'author', //更多示例
		childRoutes:[
			{
				path: 'works', //歌曲播放
				getComponent(location, cb) {
					require.ensure([], (require) => {
						cb(null, require('./Matrix'));
					});
				},
				onEnter: () => bridge.doAction('setTitle', { title: '自定义距阵' })
			},
			/*{
				path: 'pdf', 
				getComponent(location, cb) {
					require.ensure([], (require) => {
						cb(null, require('./Pdf'));
					});
				},
				onEnter: () => bridge.doAction('setTitle', { title: 'PDF' })
			}*/
		],
		indexRoute: {
			getComponent(location, cb) {
				require.ensure([], (require) => {
					cb(null, require('./Index'));
				});
			},
			onEnter: () => bridge.doAction('setTitle', { title: '更多示例' })
		}
	}
];



/*！！！以下为自定义矩阵 排版功能，*/

/*const getItems2 = (count) =>{
	let arr = Array.from({ length: count }, (v, k) => ({uid: (1+Math.random() ).toString(36).substring(2),size:60,}));
	return arr.map((k,index) => ({
		uid: (1+Math.random() ).toString(36).substring(2),
		size:60,
		children: Array.from({ length: count }, (v, k)=>({k}))
	}));
};

const tableData=(()=>getItems2(4))();
class Matrix extends Component {
	state={
		tableData:tableData,
		record:0,
		pointStart:{
			row:0,
			col:0
		},
		pointEnd:{
			row:0,
			col:0
		},
	}
	clearMatrix=(callback)=>{
		let {tableData} = this.state;
		tableData.map((k)=>{
			k.children.map(v=>{
				v.selected=false;
				return v;
			})
			return k;
		})
		this.setState({tableData},()=>callback())
	}
	renderActiveCube=()=>{
		let {pointEnd,pointStart}=this.state;
		let  maxRow = Math.max(pointStart.row, pointEnd.row);
		let  maxCol = Math.max(pointStart.col, pointEnd.col);
		this.clearMatrix(()=>{
			console.log(maxRow,maxCol)
			for(var i=0;i<=maxRow;i++){
				for(var j=0;j<=maxCol;j++){
			
					this.state.tableData[i]["children"][j]["selected"] = true;
					this.setState({tableData:this.state.tableData})
				}

			}
		})
	}
	enter=(row,col)=>{
		let {record}=this.state;
		if(record){
			// console.log(row,col)
			this.setState({
				pointEnd:{row,col}
			},()=>{
				this.renderActiveCube()
			})
		};
	}
	handlerClick=(row,col)=>{
		let {record}=this.state;
		if(!record){ //结束
			this.setState({
				pointStart:{row,col},record:1
			})
			return ;
		};
		this.setState({
			pointEnd:{row,col},record:0
		})
	}
	getTd=(child,row, count) =>{
		return child.map((k,index) => (<td className={classnames({"click":!!k.selected,})} onMouseEnter={()=>this.enter(row,index)} onClick={()=>this.handlerClick(row,index)} key={`td${index}`}>{`${row}x${index}`}</td>))
	}
	render() {
		return (
			<div className="card-intro-page">
				<Assembly pageType="introPage" {...this.props}/>

				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<div className="cubes-table">
					<table>
						<tbody>
						{
						this.state.tableData.map((k,v)=>{
							return (
								<tr key={k.uid} >
									{this.getTd(k.children,v,4)}
								</tr>
							)
						})
						}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
};*/