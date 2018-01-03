import React from 'react';
import { connect } from 'dva';
import copy from 'copy-to-clipboard';
import { Card, Icon, Modal, message, Tooltip } from 'antd';
import styles from './ChatGroupInformation.less';

function UserInformation({ chatGroupTo, dispatch, QuitChatGroupVisible, myId }) {
  const { chatGroupName, ownerId } = chatGroupTo;
  const UserGroupMapping = {
    userId: myId,
    chatGroupId: chatGroupTo.chatGroupId,
  };
  function goToChat() {
    dispatch({ type: 'app/query', payload: { ContentType: 'GroupChatRoom' } });
  }
  function goShare() {
    const urlCopyChatGroupId = chatGroupTo.chatGroupId;
    const urlCopy = 'http://localhost:8000/exampleone/toJoinChatGroup/';
    copy(urlCopy + urlCopyChatGroupId);
    message.success('复制群链接成功');
    // dispatch({ type: 'app/query', payload: { ContentType: 'GroupChatRoom' } });
  }
  function goToDeleteFriend() {
    dispatch({ type: 'app/query', payload: { QuitChatGroupVisible: true } });
  }
  function quitChatGroup() {
    dispatch({ type: 'chat/quitChatGroup', payload: UserGroupMapping });
    dispatch({ type: 'app/query', payload: { QuitChatGroupVisible: false } });
  }
  function handleCancel() {
    dispatch({ type: 'app/query', payload: { QuitChatGroupVisible: false } });
  }
  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        className={styles.Card}
        cover={<img alt="example" src="https://b-ssl.duitang.com/uploads/item/201612/31/20161231123822_NrdnS.jpeg"/>}
        actions={[
          <Tooltip title="开始聊天">
            <Icon type="message" onClick={() => goToChat()} />
          </Tooltip>,
          <Tooltip title="退出群">
            <Icon type="user-delete" onClick={() => goToDeleteFriend()} />
          </Tooltip>,
          <Tooltip title="点击复制群分享链接，邀请好友进群">
            <Icon type="export" onClick={() => goShare()} />
          </Tooltip>,
        ]}
      >
        <Meta
          title={chatGroupName}
          description={ownerId}
        />
      </Card>
      <Modal
        title="退出群聊"
        visible={QuitChatGroupVisible}
        onOk={quitChatGroup}
        onCancel={handleCancel}
        okText="退出群聊"
        cancelText="我还想聊"
      >
        <p>你确定要退出群聊吗？</p>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    myId: state.app.user.userId,
    chatGroupTo: state.app.chatGroupTo,
    QuitChatGroupVisible: state.app.QuitChatGroupVisible,
  };
}

export default connect(mapStateToProps)(UserInformation);
