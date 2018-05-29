
import { browserHistory } from 'react-router'
import { isFromWeixin,isIos } from 'src/utils/validate';

let bridge = {
  goWebView: (url) => {
    __DEBUG__ && console.info(`bridge.goWebView(${url})`)
    browserHistory.push(url)
  },
  goBack: () => {
    __DEBUG__ && console.info(`bridge.goBack()`)
    browserHistory.goBack()
  },
  doAction: (action, extra, callBack) => {
    __DEBUG__ && console.info(`bridge.doAction(action, extra, callBack)`, action, extra, callBack);
    if(!__CLIENT__){return;};
    switch (action) {
      case 'setTitle':
        if (isFromWeixin()) {
          wechatSetTitle(extra.title);
        } else {
          document.title = extra.title;
        }
        document.body.className = extra.class||"fff";
        break;
      default:
      
    }
  }
}

// 解决IOS在微信内不更新title的bug;
function wechatSetTitle(title) {
  document.title = title;
  if(isIos()){
    var frame = document.createElement('iframe');
    frame.src = '//m.baidu.com/favicon.ico';
    frame.style.display = 'none';
      document.body.appendChild(frame);
    frame.onload = ()=>{
      setTimeout(()=>{
        frame.remove();
      }, 10);
    };
  };
};

module.exports = bridge
