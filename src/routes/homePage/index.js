import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './index.less';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to Home!</h1>
      <div>
        <Button className={styles.Button} href="/exampleone/toLogin" >登录</Button>
        <Button className={styles.Button} href="/exampleone/toRegister">注册</Button>
        <Button className={styles.Button} href="/exampleone/toRegister">游客登录</Button>
      </div>
    </div>
  );
}

IndexPage.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(IndexPage);
