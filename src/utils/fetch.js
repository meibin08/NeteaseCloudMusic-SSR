import promise from 'es6-promise'
import fetch from 'isomorphic-fetch'
import StaticToast from 'src/components/common/Toast';
import Encrypt from "./crypto.js";

import querystring from 'querystring';

promise.polyfill();
var urlInfo = {};
export const fetchJson = (options) => {

	let _host_ = "music.163.com";
	let _domain_ = `http://${_host_}`;
  
  let { url, type, data={}, ...others } = options;
  
  let urlSplit = url.split("/")
  urlInfo.urlName = urlSplit[urlSplit.length-1];
  urlInfo.startTime =Date.now();

	const cryptoreq = Encrypt(data);
  
  const regApi = /\/serverApi/ig;

  let opts = {
		...others,
		method: type || 'get',
		credentials: 'include',
		headers: {
			// Referer: "http://music.163.com",
			// Host: "music.163.com",
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}
  };
  
  if(['POST','PUT'].indexOf(opts.method.toUpperCase()) >= 0){

  	// 对请求云音乐的请求（服务端渲染、客户端）接口做特殊处理
		opts.body =  url.match(/\/(serverApi|neteaseMusic)/ig)?querystring.stringify({
      params: cryptoreq.params,
      encSecKey: cryptoreq.encSecKey
    }):jsonConvert(data);

  };

  //如果是网易云音乐 则设置 headers 
  if(url.match(regApi)){
  	opts.headers.Referer =_domain_;
  	opts.headers.Host =_host_;
  	url = !__CLIENT__ ? `${_domain_}${url.replace(regApi,"")}`:`${url.replace(regApi,"/musicApi/neteaseMusic")}`;
  };
  	// console.log("rul-----------",opts,url)

  typeof opts.beforeSend === 'function' && opts.beforeSend(opts);
  
  return fetch(url, opts)
	.then(resData => toJson(resData, opts))
	.then(resData => resHandler(resData, opts))
	// .finally(res => {
 //      typeof opts.finally === 'function' && opts.finally(res);
 //    });
	// .catch(error => errorHandler(error, opts))
}

function toJson(resp, options) {
  if (resp.status >= 400) {
	return errorHandler(null, options, resp.status)
  }
  return resp.json()
}

// 请求成功处理
function resHandler(resData, options) { 
	console.log(`$$-fetch-----------${urlInfo.urlName}:请求耗时----${Date.now() - urlInfo.startTime}ms-------$$`);

  // Loading(false);
  if (resData.status && resData.status != 200) {
	return errorHandler(resData.error, options, resData.status);
  }

  if (!resData || resData.code > 10000) {
	options.error && options.error(resData)
	// console.log(resData)
		return Promise.reject(resData);
	StaticToast.error(resData.error);
  } else {
		options.success && options.success(resData);
		return (resData);
  }
}

// 异常处理
function errorHandler(error, options, status) {
  options.error && options.error(error);
  StaticToast.error(`网络异常，请稍后重试(${status})`)
  return Promise.reject(error);
}


function urlEncode(param, key, encode) {
	if(param==null) return '';
		var paramStr = '';
		var t = typeof (param);
		if (t == 'string' || t == 'number' || t == 'boolean') {
		paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
	} else {
		for (var i in param) {
			var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
			paramStr += urlEncode(param[i], k, encode);
		};
	};
	return paramStr;
};
function jsonConvert(param, key, encode){
	var ret = (urlEncode(param, key, encode)).substring(1);
	console.log(ret)
	return ret;
}
