
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
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native


const persistConfig = {
	key: 'root',storage
}

export default ((initState={}) => {
	// 
	const persistedReducer =persistReducer(persistConfig, rootReducer, ( __DEBUG__&& __CLIENT__ &&window&&window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ) );
	let createStoreWithMiddleware = compose(applyMiddleware(thunk,promise),  );
	let Store = createStore(persistedReducer,initState,createStoreWithMiddleware);
	let Persistor = persistStore(Store)
	return {Store, Persistor };
})(window.__initState__||{});

