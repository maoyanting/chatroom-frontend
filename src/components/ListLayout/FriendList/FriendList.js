import { connect } from 'dva';
import React from 'react';
import { List, Avatar } from 'antd';
import styles from './FriendList.less';


const FriendList = ({ friendList, dispatch }) => {
  /* 点击后，把key和用户信息都传给app */
  function getUserInformation(userTo) {
    dispatch({ type: 'app/query', payload: { userTo, ContentType: 'UserInformation' } });
  }
  return (
    <div className={styles.container}>
    <List
      itemLayout="horizontal"
      dataSource={friendList}
      renderItem={item => (
        <List.Item className={styles.List} >
          <List.Item.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={<a onClick={() => getUserInformation(item)} style={{ color: '#fff' }}>{item.userNickname}</a>}
            description={<p style={{ color: '#fff' }}>{item.introduction}</p>}
          />
        </List.Item>
      )}
    />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    friendList: state.app.friendList,
  };
}
export default connect(mapStateToProps)(FriendList);
