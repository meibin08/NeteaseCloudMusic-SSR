
import {combineReducers} from "redux"; //combinReducers用于合并各模块的reducers;
import homeIndex from "./Home";
import homeHot from "./Home/hot";
// import homeFriends from "./Home/friends";

export default combineReducers({
	homeIndex,
	homeHot
});
