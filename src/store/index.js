
import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

function configStore (initState){
    let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    //dev环境开启redux调试
    let store  = createStoreWithMiddleware(reducers,initState,(__DEBUG__&& __CLIENT__ && window.devToolsExtension ? window.devToolsExtension() : undefined));
    return store;
};

export default configStore;
