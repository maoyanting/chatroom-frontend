import React from 'react';
import { connect } from 'dva';
import { Card, Icon, Modal } from 'antd';
import styles from './UserInformation.less';

function UserInformation({ userTo, dispatch, DeleteFriendVisible, myId }) {
  const { userNickname, userId } = userTo;
  const UserMapping = {
    userAId: myId,
    userBId: userId,
  };
  function goChat() {
    dispatch({ type: 'app/query', payload: { ContentType: 'ChatWebSocket' } });
  }

  function goToDeleteFriend() {
    dispatch({ type: 'app/query', payload: { DeleteFriendVisible: true } });
  }
  function deleteFriend() {
    dispatch({ type: 'chat/deleteFriend', payload: UserMapping });
    dispatch({ type: 'app/query', payload: { DeleteFriendVisible: false } });
  }
  function handleCancel() {
    dispatch({ type: 'app/query', payload: { DeleteFriendVisible: false } });
  }
  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        className={styles.Card}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
        actions={[<Icon type="message" onClick={() => goChat()} />,
          <Icon type="user-delete" onClick={() => goToDeleteFriend()} />]}
      >
        <Meta
          title={userNickname}
          description=" "
        />
      </Card>
      <Modal
        title="删除好友"
        visible={DeleteFriendVisible}
        onOk={deleteFriend}
        onCancel={handleCancel}
        okText="删除这个好友"
        cancelText="我们还是朋友"
      >
        <p>你确定要删除这位好友吗？</p>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    myId: state.app.user.userId,
    userTo: state.app.userTo,
    DeleteFriendVisible: state.app.DeleteFriendVisible,
  };
}

export default connect(mapStateToProps)(UserInformation);
