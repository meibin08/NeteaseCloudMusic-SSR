/*
 * @authors :Bin Mei
 * @date    :2017-07-27
 * @description：redux store 服务端 对外输出 ；
 */

import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import promise from 'redux-promise';
import rootReducer from "./reducers";

	//dev环境开启redux调试
	/*let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
		return createStoreWithMiddleware(reducers,initState,(__DEBUG__&& __CLIENT__ && window.devToolsExtension ? window.devToolsExtension() : undefined));*/

export default ((initState={}) => {
	
	let createStoreWithMiddleware = compose(applyMiddleware(thunk,promise));
	return createStore(rootReducer,initState,createStoreWithMiddleware );

})((typeof window != 'undefined'&&window.__initState__)||{});

