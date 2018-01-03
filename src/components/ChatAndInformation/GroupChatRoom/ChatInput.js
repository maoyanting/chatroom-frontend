import React from 'react';
import { connect } from 'dva';
import { Input, Button } from 'antd';
import styles from './ChatInput.less';

const { TextArea } = Input;

function ChatInput({ userFrom, chatGroupTo, dispatch, groupMessageOld, socket }) {
  const groupMessageNew = {
    userFromId: userFrom.userId,
    message: '',
    chatGroupId: chatGroupTo.chatGroupId,
    time: '',
    messageType: 2,
  };
  function sendMessageToState() {
    /* 把消息储存到state里面 */
    // dispatch({ type: 'app/query', payload: { groupMessage: [...groupMessageOld, groupMessageNew] } });
    /* 用socket发送信息 */
    console.log('----------send group message-----------');
    console.log(groupMessageNew);
    socket.send(JSON.stringify(groupMessageNew));
  }
  function handleChange(event) {
    groupMessageNew.message = event.target.value;
    groupMessageNew.time = new Date();
  }
  return (
    <div className={styles.ChatInput}>
      <TextArea rows={4} placeholder="按回车提交" className={styles.TextArea} onChange={handleChange} onPressEnter={() => sendMessageToState()} />
      <Button style={{ width: 100, float: 'right' }} onClick={() => sendMessageToState()}>发送</Button>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    userFrom: state.app.user,
    chatGroupTo: state.app.chatGroupTo,
    groupMessageOld: state.app.groupMessage,
    socket: state.app.socket,
  };
}

export default connect(mapStateToProps)(ChatInput);
