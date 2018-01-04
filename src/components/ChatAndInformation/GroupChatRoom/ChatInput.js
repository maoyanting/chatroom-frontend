import React from 'react';
import { connect } from 'dva';
import { Input, Button } from 'antd';
import styles from './ChatInput.less';

const { TextArea } = Input;

function ChatInput({ userFrom, chatGroupTo, dispatch, InputMessage, socket }) {
  const groupMessageNew = {
    userFromId: userFrom.userId,
    message: '',
    chatGroupId: chatGroupTo.chatGroupId,
    time: '',
    messageType: 2,
  };
  let inputMessage = '';
  function sendMessageToState() {
    groupMessageNew.message = InputMessage;
    groupMessageNew.time = new Date();
    /* 用socket发送信息 */
    socket.send(JSON.stringify(groupMessageNew));
    dispatch({ type: 'app/query', payload: { InputMessage: '' } });
  }
  function handleChange(event) {
    inputMessage = event.target.value;
    dispatch({ type: 'app/query', payload: { InputMessage: inputMessage } });
  }
  return (
    <div className={styles.ChatInput}>
      <TextArea
        rows={4} value={InputMessage} placeholder="按回车提交" className={styles.TextArea}
        onChange={handleChange} onPressEnter={() => sendMessageToState()}
      />
      <Button style={{ width: 100, float: 'right' }} onClick={() => sendMessageToState()}>发送</Button>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    userFrom: state.app.user,
    chatGroupTo: state.app.chatGroupTo,
    InputMessage: state.app.InputMessage,
    socket: state.app.socket,
  };
}

export default connect(mapStateToProps)(ChatInput);
