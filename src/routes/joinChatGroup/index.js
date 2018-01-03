import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './index.less';

function JoinChatGroup({ dispatch }) {
  function toJoinChatGroup() {
    dispatch({ type: 'JoinChatGroup', payload: { SearchUserVisible: false } });
  }
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>你被邀请加入群聊!</h1>
      <div>
        <Button className={styles.Button} onClick={toJoinChatGroup} >加入群</Button>
      </div>
    </div>
  );
}

JoinChatGroup.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(JoinChatGroup);
