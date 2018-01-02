import React from 'react';
import { connect } from 'dva';
import { Avatar } from 'antd';
import styles from './MyHeader.less';
import NoticeList from './NoticeList/NoticeList';
import SettingList from './SettingList/SettingList';

function MyHeader({ userNickname }) {
  return (
    <div className={styles.MyHeader}>
      <Avatar shape="square" size="large" icon="user" className={styles.Avatar} />
      <div className={styles.userNickname}>{ userNickname }</div>
      <div className={styles.List}>
        <NoticeList />
        <SettingList />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    ListType: state.app.ListType,
  };
}
export default connect(mapStateToProps)(MyHeader);
