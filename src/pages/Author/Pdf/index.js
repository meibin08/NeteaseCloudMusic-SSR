/*
 * @authors :Bin Mei
 * @date    :2017-07-27
 * @description： 网易音乐 -- 自定义距阵
 */

import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classnames from 'classnames';
import { Link  } from 'react-router';
import { fetchJson } from 'src/utils/fetch';
import {StaticToast,Svg,PanelNav} from 'src/components/common';
import format from "src/utils/format";
import actions from "src/store/actions";
import { Document,Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import './Pdf.scss';

/*import PDF from 'react-pdf-js';

class Preview extends Component {
  state = { page: 1 };

  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }

  renderPagination = (page, pages) => {
    let previousButton = (
      <li className="previous">
        <button onClick={this.handlePrevious} className="btn btn-link">
          Previous
        </button>
      </li>
    );
    if (page === 1) {
      previousButton = (
        <li className="previous disabled">
          <button className="btn btn-link">
            Previous
          </button>
        </li>
      );
    }
    let nextButton = (
      <li className="next">
        <button onClick={this.handleNext} className="btn btn-link">
          Next
        </button>
      </li>
    );
    if (page === pages) {
      nextButton = (
        <li className="next disabled">
          <button className="btn btn-link">
            Next
          </button>
        </li>
      );
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  }

  render () {
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div className="pdf-preview">
        <PDF file="/musicApi/pdf/website/group/document/clause/clause_761.pdf" onDocumentComplete={this.onDocumentComplete} page={this.state.page} />
        {pagination}
      </div>
    );
  }
}*/
class Preview extends Component{
	state={
		numPages: null,
	}
	onDocumentLoadSuccess=({ numPages })=>{
		console.log("imya",numPages)
		this.setState({numPages});
	}
	render(){
		let {numPages}=this.state;
		return (
			<div className="pdf-preview" >
				<Document
          file="/musicApi/pdf/website/group/document/clause/clause_761.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess} >
          	<Page pageNumber={1} scale={.8} width={screen.width+(screen.width/5)}/>
          </Document>
          
			</div>
		)
	}
}


let mapStateToProps =(state)=>{
	return {};
}; 

let mapDispatchToProps=(dispatch)=>{
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default  connect(mapStateToProps,mapDispatchToProps)(Preview);
