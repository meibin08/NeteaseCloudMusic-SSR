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
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable,DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot, } from 'react-beautiful-dnd';
 
const dataList ={
    "id": "first-level", 
    "title": "top level", 
    "children": [
        {
            "id": "quote-1309", 
            "content": "Don't you always call sweatpants 'give up on life pants,' Jake?", 
            "author": {
                "id": "3", 
                "name": "Finn", 
                "url": "http://adventuretime.wikia.com/wiki/Finn", 
                "avatarUrl": "https://68.media.tumblr.com/avatar_09404f3287c6_128.png"
            }
        }, 
        {
            "id": "quote-1310", 
            "content": "Is that where creativity comes from? From sad biz?", 
            "author": {
                "id": "3", 
                "name": "Finn", 
                "url": "http://adventuretime.wikia.com/wiki/Finn", 
                "avatarUrl": "https://68.media.tumblr.com/avatar_09404f3287c6_128.png"
            }
        }, 
        {
            "id": "second-level", 
            "title": "second level", 
            "children": [
                {
                    "id": "quote-1312", 
                    "content": "That's it! The answer was so simple, I was too smart to see it!", 
                    "author": {
                        "id": "4", 
                        "name": "Princess bubblegum", 
                        "url": "http://adventuretime.wikia.com/wiki/Princess_Bubblegum", 
                        "avatarUrl": "https://68.media.tumblr.com/avatar_ec98529441c4_128.png"
                    }
                }, 
                {
                    "id": "quote-1313", 
                    "content": "Please! I need the real you!", 
                    "author": {
                        "id": "4", 
                        "name": "Princess bubblegum", 
                        "url": "http://adventuretime.wikia.com/wiki/Princess_Bubblegum", 
                        "avatarUrl": "https://68.media.tumblr.com/avatar_ec98529441c4_128.png"
                    }
                }
            ]
        }, 
        {
            "id": "quote-1315", 
            "content": "I should not have drunk that much tea!", 
            "author": {
                "id": "4", 
                "name": "Princess bubblegum", 
                "url": "http://adventuretime.wikia.com/wiki/Princess_Bubblegum", 
                "avatarUrl": "https://68.media.tumblr.com/avatar_ec98529441c4_128.png"
            }
        }, 
        {
            "id": "quote-1316", 
            "content": "Sometimes life is scary and dark", 
            "author": {
                "id": "2", 
                "name": "BMO", 
                "url": "http://adventuretime.wikia.com/wiki/BMO", 
                "avatarUrl": "https://68.media.tumblr.com/avatar_1a34fe6de498_128.png"
            }
        }, 
        {
            "id": "quote-1317", 
            "content": "Is that where creativity comes from? From sad biz?", 
            "author": {
                "id": "3", 
                "name": "Finn", 
                "url": "http://adventuretime.wikia.com/wiki/Finn", 
                "avatarUrl": "https://68.media.tumblr.com/avatar_09404f3287c6_128.png"
            }
        }
    ]
}

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    filter: `blur(${isDragging?1:0}px)`,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

class App extends Component {
    state = {
        items: getItems(10),
        selected: getItems(5, 10)
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];
    onDragStart=(result)=>{
    	// console.log(result)
    }
    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        console.log(result)
        if(source.droppableId === "droppable" ){
        	const items = reorder(
	            this.state.items,
	            source.index,
	            destination.index
	        );

	        this.setState({items});
        }else if (source.droppableId === 'droppable2') {
            const selected = reorder(
	            this.state.selected,
	            source.index,
	            destination.index
	        );
             this.setState({selected});
	      }
        /*if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }*/
    };
    renderQuote = (quote, type: string, index: number) => (
    	<Draggable key={quote.id} draggableId={quote.id} type={type} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div 
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <p>{type}-{quote.id}-{index}</p>
        </div>
      )}
    </Draggable>
  );

  renderList = (list: NestedQuoteList, level?: number = 0) => (
    <Droppable droppableId={list.id} type={list.id} key={list.id}>
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot,
      ) => (
        <Container
          innerRef={dropProvided.innerRef}
          isDraggingOver={dropSnapshot.isDraggingOver}
          {...dropProvided.droppableProps}
        >
          <Title>{list.title}</Title>
          {list.children.map(
            (item: Quote | NestedQuoteList, index: number) =>
              !item.children ? (
                this.renderQuote((item: any), list.id, index)
              ) : (
                <Draggable
                  draggableId={item.id}
                  type={list.id}
                  key={item.id}
                  index={index}
                >
                  {(
                    dragProvided: DraggableProvided,
                    dragSnapshot: DraggableStateSnapshot,
                  ) => (
                    <NestedContainer
                      innerRef={dragProvided.innerRef}
                      isDragging={dragSnapshot.isDragging}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      {this.renderList((item: any), level + 1)}
                    </NestedContainer>
                  )}
                </Draggable>
              ),
          )}
        </Container>
      )}
    </Droppable>
  );
    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" type={"droppable"}>
                    {(dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot) => (
                        <div
                            ref={dropProvided.innerRef}
                            style={getListStyle(dropSnapshot.isDraggingOver)}>
                            {this.state.items.map((item, v) => (
                            	<div key={item.id}>
                            		<Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={v}>
                                    {(dropProvided: DraggableProvided,dropSnapshot: DraggableStateSnapshot) => (
                                        <div
                                            ref={dropProvided.innerRef}
                                            {...dropProvided.draggableProps}
                                            {...dropProvided.dragHandleProps}
                                            style={getItemStyle(
                                                dropSnapshot.isDragging,
                                                dropProvided.draggableProps.style
                                            )}>
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                                <div>
				                           {v===8 &&(
				                           	<QuoteWrapper type={"listId"+item.id}>
				                           		<div>
				                           			<p>测试</p>
				                           			<p>测试</p>
				                           			<p>测试</p>
				                           			<p>测试</p>
				                           			<p>测试</p>
				                           			<ul>
				                           				<li>item-1</li>
				                           				<li>item-2</li>
				                           				<li>item-3</li>
				                           				<li>item-4</li>
				                           				<li>item-5</li>
				                           				<li>item-6</li>
				                           			</ul>
				                           		</div>
				                            	{dataList.children[2].children.map(
																	            (item , index: number) =>
																	              !item.children ? (
																	                <QuoteItem quote={item} index={index} type={"listId"+item.id}/>
																	              ) : (
																	                null
																	              ),
																	          )}
				                            </QuoteWrapper>
				                           )} 
				                            </div>
                            	</div>
                                
                            ))}
                            {dropProvided.placeholder}
                            
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="droppable2" type={"droppable2"}>
                    {(dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot) => (
                        <div
                            ref={dropProvided.innerRef}
                            style={getListStyle(dropSnapshot.isDraggingOver)}>
                            {this.state.selected.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(dropProvided: DraggableProvided,dropSnapshot: DraggableStateSnapshot) => (
                                        <div
                                            ref={dropProvided.innerRef}
                                            {...dropProvided.draggableProps}
                                            {...dropProvided.dragHandleProps}
                                            style={getItemStyle(
                                                dropSnapshot.isDragging,
                                                dropProvided.draggableProps.style
                                            )}>
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {dropProvided.placeholder}
                        </div>
                    )}
                </Droppable>

            </DragDropContext>
        );
    }
}
class QuoteWrapper extends Component{
	render(){
		let {type}=this.props;
		return(
			<Droppable droppableId={type} type={type} key={type}>
	      {(
	        dropProvided: DroppableProvided,
	        dropSnapshot: DroppableStateSnapshot,
	      ) => (
	        
	        <div
	          ref={dropProvided.innerRef}
	          {...dropProvided.droppableProps}
	        >
	          <h3>{`list.title----${type}`}</h3>

	          <div>{this.props.children}</div>
	        </div>
	      )}
	    </Droppable>
		)
	}
}
// Put the things into the DOM!
class QuoteItem extends Component{
	render(){
		let {quote,type,index}=this.props;
		return(
			<Draggable key={quote.id} draggableId={type} type={type} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div 
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <p>{type}---;{quote.id}-;{index}</p>
        </div>
      )}
    </Draggable>
		)
	}
}

class Works extends Component{
	
  state={
  	isPlay:true,
  	currentIndex:0
  }
	render(){
		let {isPlay,currentIndex}=this.state;
		return ( 
			<div className="works">
				作者
				<App {...this.props}/>
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