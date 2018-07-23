
import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import {autoRehydrate} from 'redux-persist'
import reducers from "./reducers";

function configStore (initState={}){

		let createStoreWithMiddleware = compose(applyMiddleware(thunk),autoRehydrate());
		if(__DEBUG__&& __CLIENT__){
			createStoreWithMiddleware = compose(applyMiddleware(thunk),autoRehydrate(), (window.devToolsExtension ? window.devToolsExtension() : undefined) )
		}
		return createStore(reducers,initState,createStoreWithMiddleware );
    
    //dev环境开启redux调试
    /*let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    	return createStoreWithMiddleware(reducers,initState,(__DEBUG__&& __CLIENT__ && window.devToolsExtension ? window.devToolsExtension() : undefined));*/
};

export default configStore;


