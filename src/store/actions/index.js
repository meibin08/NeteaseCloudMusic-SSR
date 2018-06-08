
/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：action对外输出 - 各模块勿重复相同的函数名；
 */

import homeIndex from "./Home/index";
import homeHot from "./Home/hot";
import homeSearch from "./Home/search";
import songIndex from "./Song";

let actions = Object.assign({},
	homeIndex,
	homeHot,
	homeSearch,
	songIndex,
	);
export default actions;
