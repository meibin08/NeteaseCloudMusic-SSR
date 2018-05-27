
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';


let StaticToast = {
  /*default: (message, callback, duration, theme) => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render((
        <Toast
          duration={ duration || 3500 }
          visible={ true }
          onMaskClick={ () => {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
            callback && callback();
          }}>
          <Icon type={ theme || "close-round" } style={{ fontSize: '3rem' }} />
          <p>{ message }</p>
        </Toast>), div);
  },*/
  info: (message, callback, duration) => {
    Toast.info(message, duration||2,callback);
  },

  success: (message, callback, duration) => {
    Toast.success(message, duration||2,callback);
  },

  warning: (message, callback, duration) => {
    Toast.fail(message, duration||2,callback);

  },
  error: (message, callback, duration) => {
    Toast.fail(message, duration||2,callback);
  }
}

export default StaticToast;