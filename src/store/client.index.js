
/*
 * @authors :Bin Mei
 * @date    :2017-07-27
 * @description：redux store 客户端 对外输出 ；
 */


import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import promise from 'redux-promise';
import rootReducer from "./reducers";
// import {autoRehydrate} from 'redux-persist'

import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import storageSession from 'redux-persist/lib/storage/session'; 

const persistConfig = {
	key: 'root',storage:storageSession
}

export default ((initState={}) => {

	const persistedReducer =persistReducer(persistConfig, rootReducer );
	//const composeEnhancers =  ( __DEBUG__&& __CLIENT__ &&window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ )||compose; // 写法一
	const composeEnhancers = (__DEBUG__&& __CLIENT__ && typeof window === 'object' &&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ?   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose; //写法二
	let createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk,promise) );
	let Store = createStore(persistedReducer,initState,createStoreWithMiddleware);
	let Persistor = persistStore(Store);
	return {Store, Persistor };
})(window.__initState__||{});

