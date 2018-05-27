/*
 * @authors :Bin Mei
 * @date    :2018-05-26
 * @description： 共用导航
 */

import React, { Component } from 'react';
import {Link } from 'react-router';
import classnames from 'classnames';
import { Button } from 'antd-mobile';


class PanelNav extends Component {
  
  render() {
    const {className,title='', ...others } = this.props;

    return (
      <h3 className={classnames("panel-nav",{[`${className}`]:!!className})}>{title}</h3>
    )
  }
}

export default PanelNav
