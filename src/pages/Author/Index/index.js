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
    filter: `blur(${isDragging?.7:0}px)`,
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
    	console.log(result)
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
                            {this.state.items.map((item, index) => (
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

// Put the things into the DOM!


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