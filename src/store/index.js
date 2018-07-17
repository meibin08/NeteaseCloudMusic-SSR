
import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import {autoRehydrate} from 'redux-persist'
import reducers from "./reducers";

function configStore (initState={}){
    let createStoreWithMiddleware = compose(applyMiddleware(thunk),autoRehydrate(),(__DEBUG__&& __CLIENT__ && window.devToolsExtension ? window.devToolsExtension() : undefined));
    //dev环境开启redux调试
    return createStore(reducers,initState,createStoreWithMiddleware);
};

export default configStore;
