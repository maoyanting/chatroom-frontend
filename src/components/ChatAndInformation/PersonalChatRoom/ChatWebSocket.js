import React from 'react';
import { connect } from 'dva';
import { Divider } from 'antd';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

function ChatWebSocket({ userTo, dispatch }) {
  function getUserInformation() {
    dispatch({ type: 'app/query', payload: { ContentType: 'UserInformation' } });
  }
  const { userNickname } = userTo;
  return (
    <div>
      <div style={{ padding: 20, width: 200, height: 31 }}>
        <a onClick={() => getUserInformation()}>{ userNickname }</a>
      </div>
      <Divider />
      <div style={{ padding: -5, height: 320, overflow: 'scroll' }}>
        <ChatMessages />
      </div>
      <Divider />
      <div style={{ padding: 0, Height: 60}}>
        <ChatInput />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userTo: state.app.userTo,
  };
}

export default connect(mapStateToProps)(ChatWebSocket);
