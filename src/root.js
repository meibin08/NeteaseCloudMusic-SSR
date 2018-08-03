import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import { hashHistory,browserHistory, Router,match } from 'react-router';
import {Store, Persistor } from "src/store/client.index";
import { PersistGate } from 'redux-persist/integration/react'
// import {persistStore} from 'redux-persist'
import routes from './pages/routes';

// const Store = configureStore(window.__initState__);
// persistStore(Store, {blacklist: []});
const __history__ = (!__STATIC__?browserHistory:hashHistory);

match({history: __history__, routes}, (error, redirectLocation, renderProps) => {
	
	ReactDOM.render(
			<Provider store={Store}>
					<Router {...renderProps}/>
			</Provider>,
			document.getElementById('app')
	)
})





/*
 PPT  静态方法 class static 
 class Test{
	constructor(x, y) {
		this.name = "小明";
		this.age = 26;
	}
	static getData(){
		console.log("static-静态方法,name："+this.name+",age："+this.age+";静态方法不会被实例继承，而是直接通过类");
	}
	getData(){
		console.log("-----普通方法,name："+this.name+",age："+this.age+"------###");
	}
 }
 var A = new Test();
 A.getData();
 Test.getData();
*/