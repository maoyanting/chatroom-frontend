import React from 'react';
import { connect } from 'dva';
import MyMessage from './MyMessage';


function ChatMessages({ groupMessage, chatGroupIdNow, myId }) {
  if (groupMessage) {
    return (<div>
      {
        groupMessage.map(
          (
            { message, chatGroupId, userFromId }, key) => (
            <MyMessage chatGroupId={chatGroupId} userFromId={userFromId} message={message} isThatGroup={(chatGroupIdNow === chatGroupId)} isMeSend={(userFromId === myId)} key={key} />
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
    myId: state.app.user.userId,
    groupMessage: state.app.groupMessage,
    chatGroupIdNow: state.app.chatGroupTo.chatGroupId,
  };
}
export default connect(mapStateToProps)(ChatMessages);

