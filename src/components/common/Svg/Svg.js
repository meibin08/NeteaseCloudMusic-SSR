/*
 * @authors :Bin Mei
 * @date    :2018-05-26
 * @description： svg共用组件
 */

import React, { Component} from 'react'
import classnames from 'classnames';

class Svg extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    const { hash="svg-empty",href,title, className='', ...others } = props;
    const cls = classnames("svg-default",{[`${className}`]:true});
    const _src = (href?href:(require(`./images/icon.svg`)+`#${hash}`));
   
    return (
        <svg className={cls} title={title} {...others}>
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={_src} />
        </svg>
    )
  }
}

export default Svg
