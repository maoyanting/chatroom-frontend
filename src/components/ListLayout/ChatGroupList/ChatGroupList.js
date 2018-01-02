import { connect } from 'dva';
import React from 'react';
import { List, Avatar } from 'antd';
import styles from './ChatGroupList.less';


const ChatGroupList = ({ chatGroupList, dispatch }) => {
  /* 点击后，把key和用户信息都传给app */
  function getChatGroupInformation(chatGroupTo) {
    dispatch({ type: 'app/query', payload: { chatGroupTo, ContentType: 'ChatWebSocket' } });
  }
  return (
    <div className={styles.container}>
      <List
        itemLayout="horizontal"
        dataSource={chatGroupList}
        renderItem={item => (
          <List.Item className={styles.List} >
            <List.Item.Meta
              // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a onClick={() => getChatGroupInformation(item)} style={{ color: '#fff' }}>{item.chatGroupName}</a>}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    chatGroupList: state.app.chatGroupList,
  };
}
export default connect(mapStateToProps)(ChatGroupList);
