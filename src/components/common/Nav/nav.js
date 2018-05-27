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

const svgIcon = require('./images/icon.svg');
class Nav extends Component {
  
  render() {
    const props = this.props;
    const { children, className,title, ...others } = props;

    return (
      <div className="cm-nav-tit">
        <p className="flex"><Svg className="svg-music-logo" href={`${svgIcon}#svg-music-logo`}/></p>
        <p className="flex github-row"><a href="https://github.com/meibin08"><Svg className="svg-github" href={`${svgIcon}#svg-github`}/></a></p>
      </div>
    )
  }
}
// <Button type="ghost" inline size="small">下载APP</Button>
export default Nav
