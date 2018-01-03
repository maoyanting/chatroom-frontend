import React from 'react';
import { connect } from 'dva';
import MyMessage from './MyMessage';


function ChatMessages({ sendMessage, userToIdNow }) {
  if (sendMessage) {
    return (<div>
      {
        sendMessage.map(
          (
            { message, userToId, userFromId }, key) => (
            <MyMessage userToId={userToId} userFromId={userFromId} message={message} isMeGet={(userFromId === userToIdNow)} isMeSend={(userToId === userToIdNow)} key={key} />
          )
        )
      }
    </div>);
  }
  return (
    <div>
      <p>没有聊天信息</p>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    sendMessage: state.app.sendMessage,
    userToIdNow: state.app.userTo.userId,
  };
}
export default connect(mapStateToProps)(ChatMessages);

