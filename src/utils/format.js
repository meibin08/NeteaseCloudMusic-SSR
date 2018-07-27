import { isNotEmpty, isIdCard } from './validate';
import Events from './events';

const format = {

  // 格式化日期
  date: function (date, fmt) {
		if (!date || !fmt) {
		  return date;
		}
		if (date.length == 8) {
		  date = date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2)
		}
		if( typeof date !== 'number' && date.length <= 20){ //小于20 ，时间格式为  “yyyy-MM-dd hh:mm:ss” 有时分秒
			date = date.toString().replace(/-/g, "/");
		};
		date = new Date(date);
		var o = {
		  "M+": date.getMonth() + 1, //月份
		  "d+": date.getDate(), //日
		  "h+": date.getHours(), //小时
		  "m+": date.getMinutes(), //分
		  "s+": date.getSeconds(), //秒
		  "q+": Math.floor((date.getMonth() + 3) / 3), //季度
		  "S": date.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
  },
	formatMsgTime:(date)=>{
		let now = Date.now();
		var dateTime = new Date(date).getTime();
		let milliseconds = now - dateTime;
		let _time = format.date(date,'hh:mm:ss');
		let Minute = 1000 * 60 * 1 ;//一分钟
		let Hour = Minute*60 ;//一小时
		let Day = Hour*24 ;//一天
		let dayArr = ["","昨","前"];

		if(milliseconds < Minute  ){
			return "刚刚";
		} else if( milliseconds <= Hour ){
			return Math.round(milliseconds / Minute)+"分钟前";
		} else if(milliseconds  <= Day){
			return Math.round(milliseconds / Hour)+"小时前";
		} else if( milliseconds <= Day*15 ){
			let r =  Math.round(milliseconds / Day)
			return r <= 2 ? `${dayArr[r]}天 ${_time}`:`${r}天前`;
		};

	},
	guid:()=>{
		return Math.random().toString(36).substr(5).toUpperCase();
	},

  // 根据身份证获取出生年月
 //  getBirthdayByIdCard(idCard) {
	// if (!isIdCard(idCard)) {
	//   return;
	// }
	// let tmpStr;
	// if (idCard.length == 15) {
	//   tmpStr = idCard.substring(6, 12);
	//   tmpStr = "19" + tmpStr;
	//   tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
	//   return tmpStr;
	// } else {
	//   tmpStr = idCard.substring(6, 14);
	//   tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
	//   return tmpStr;
	// }
 //  },

 //  // 根据身份证获取性别
 //  getSexByIdCard(idCard) {
	// if (!isIdCard(idCard)) {
	//   return;
	// }
	// return (parseInt(idCard.substr(16, 1)) % 2)
 //  },
  units:(num,decimals,coerce,fmt)=>{
		/*
		* @ 单位转换
		* @ num 金额 ，大于w默认返回 万 
		* @ decimals 小数点位数 默认 2位
		* @ coerce 强制保留几位小数
		* @ fmt 单位，默认 万

		*/ 
		var min = 10000;
		if(!num){
			return '0'+(fmt||'万');
		};
		let sum  = num/min;
		let remainder = sum.toString().split(".");
		let digit = remainder.length>1 ? remainder[1].length:0;//保留几位小数
		let _decimals = decimals ? (digit >= decimals ? decimals : (digit >= 2 ? digit : 2)) : 2;
		let cutOut = sum.toFixed(_decimals); //截取后的值;
		let operation = parseInt(cutOut) === parseFloat(cutOut) ? parseInt(cutOut):cutOut;
		let result = ( coerce?sum.toFixed(decimals) : (~~sum !== sum)?operation:sum ) ;
		// console.log(cutOut,operation,parseInt(cutOut))

		return result+(fmt||'万');
	},
	n(num){
		if(num<10){
			return '0'+num;
		};
		return ''+num;
	}
};

module.exports = format;