
/*
 * @authors :Bin Mei
 * @date    :2017-05-26
 * @description：action对外输出 - 各模块勿重复相同的函数名；
 */

import homeIndex from "./Home/index";
import homeHot from "./Home/hot";

let actions = Object.assign({},
	homeIndex,
	homeHot
	);
export default actions;
