/*
 * @authors :Bin Mei
 * @date    :2018-05-26
 * @description： 共用导航
 */

import React, { Component } from 'react';
import {Link } from 'react-router';
import classnames from 'classnames';
import { Button } from 'antd-mobile';

import Svg from '../Svg';

class Footer extends Component {
  
  render() {
    const props = this.props;
    const { children, className,title, ...others } = props;

    return (
      <footer className="cm-footer">
        <p className="footer-logo"><Svg className="svg-logo" href={`${require('./images/icon.svg')}#svg-footer-logo`}/></p>
        <p className="ohter-info">
          <a className="custom-button">发现好音乐</a>
          <a className="custom-button">了解其他示例</a>
        </p>
        <p className="foot-caveat">该示例仅限学习交流，请勿用于商业用途！</p>
      </footer>
    )
  }
}

export default Footer
