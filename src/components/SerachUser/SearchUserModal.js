import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';


function SearchUserModal({ SearchUserVisible, dispatch, SearchUser, socket, user }) {
  const { userName, userNickname, introduction, userId } = SearchUser;
  const FriendRequest = {
    initiatorId: user.userId,
    acceptorId: SearchUser.userId,
    conditionNumber: 2,
    messageType: 3,
  };
  function sendFriendRequest() {
    dispatch({ type: 'app/query', payload: { SearchUserVisible: false } });
    socket.send(JSON.stringify(FriendRequest));
  }
  function handleCancel() {
    dispatch({ type: 'app/query', payload: { SearchUserVisible: false } });
  }
  if (userId === 111) { return (
    <Modal
      title="查找用户"
      visible={SearchUserVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <p>没有找到好友</p>
    </Modal>
  ); }
  if (userId === 222) { return (
    <Modal
      title="查找用户"
      visible={SearchUserVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <h1>它已经是你的好友</h1>
      <p>用户名:{userName}</p>
      <p>用户昵称:{userNickname}</p>
      <p>个人简介:{introduction}</p>
    </Modal>
  ); }
  return (<Modal
    title="查找用户"
    visible={SearchUserVisible}
    onOk={sendFriendRequest}
    onCancel={handleCancel}
    okText="加好友"
    cancelText="取消"
  >
    <p>用户名:{userName}</p>
    <p>用户昵称:{userNickname}</p>
    <p>个人简介:{introduction}</p>
  </Modal>);

}
function mapStateToProps(state) {
  return {
    SearchUserVisible: state.app.SearchUserVisible,
    SearchUser: state.app.SearchUser,
    socket: state.app.socket,
    user: state.app.user,
  };
}

export default connect(mapStateToProps)(SearchUserModal);
