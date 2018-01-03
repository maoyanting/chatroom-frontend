import React from 'react';
import { connect } from 'dva';
import { Input, Button } from 'antd';
import styles from './ChatInput.less';

const { TextArea } = Input;

function ChatInput({ userFrom, userTo, dispatch, sendMessageOld, socket }) {
  const sendMessageNew = {
    userFromId: userFrom.userId,
    userToId: userTo.userId,
    message: '',
    time: '',
    messageType: 1,
  };
  function sendMessageToState() {
    /* 把消息储存到state里面 */
    dispatch({ type: 'app/query', payload: { sendMessage: [...sendMessageOld, sendMessageNew] } });
    /* 用socket发送信息 */
    socket.send(JSON.stringify(sendMessageNew));
  }
  function handleChange(event) {
    sendMessageNew.message = event.target.value;
    sendMessageNew.time = new Date();
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
    userTo: state.app.userTo,
    userFrom: state.app.user,
    sendMessageOld: state.app.sendMessage,
    socket: state.app.socket,
  };
}

export default connect(mapStateToProps)(ChatInput);
