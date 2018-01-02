import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';

const Succeed = () => (<div className="content-inner">
  <div className={styles.error}>
    <Icon type="trophy" />
    <h1>恭喜你操作成功</h1>
  </div>
</div>)

export default Succeed;
