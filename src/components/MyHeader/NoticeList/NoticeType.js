import React from 'react';
import { connect } from 'dva';
import { List, Button } from 'antd';


const NoticeType = ({ dispatch, friendRequest, socket, Notice, NoticeIsReply, NoticeLength }) => {
  const { initiatorId, acceptorId, conditionNumber, messageType } = friendRequest;
  /* 判断这个notice在NoticeList里面的位置 */
  const NoticeIndex = Notice.indexOf(friendRequest);
  function returnFriendRequest(conditionNumber1) {
    dispatch({ type: 'app/query', payload: { NoticeListVisible: false } });
    const FriendRequestReply = {
      initiatorId: friendRequest.initiatorId,
      acceptorId: friendRequest.acceptorId,
      conditionNumber: conditionNumber1,
      messageType: 4,
    };
    socket.send(JSON.stringify(FriendRequestReply));
    Notice.splice(NoticeIndex, 1);
    dispatch({ type: 'app/query', Notice });
    const FriendRequestIsReply = {
      initiatorId: friendRequest.initiatorId,
      acceptorId: friendRequest.acceptorId,
      conditionNumber: conditionNumber1,
      messageType: 3,
    };
    dispatch({ type: 'app/query', payload: { NoticeIsReply: [...NoticeIsReply, FriendRequestIsReply], NoticeLength: NoticeLength - 1 } });
    dispatch({ type: 'chat/getFriendList' });
  }
  function NoticeReply() {
    dispatch({ type: 'app/query', payload: { NoticeListVisible: false } });
    const FriendRequestReply = {
      initiatorId: friendRequest.initiatorId,
      acceptorId: friendRequest.acceptorId,
      conditionNumber: friendRequest.conditionNumber,
      messageType: 4,
    };
    Notice.splice(NoticeIndex, 1);
    dispatch({ type: 'app/query', Notice });
    dispatch({ type: 'app/query', payload: { NoticeIsReply: [...NoticeIsReply, FriendRequestReply], NoticeLength: NoticeLength - 1 } });
    dispatch({ type: 'chat/getFriendList' });
  }
  if (conditionNumber === 2) {
    /* 收到的 但是还没回复 的好友请求 conditionNumber：2 messageType: 3  需要显示按钮 */
    /* 我收到了一个好友请求，还没想好要不要回复 */
    return (
      <div>
        <List.Item.Meta
          title={<a style={{ color: '#000000' }}>{initiatorId}想加你为好友</a>}
        />
        <Button type="primary" onClick={() => returnFriendRequest(1)}>同意</Button>
        <Button onClick={() => returnFriendRequest(0)}>拒绝</Button>
      </div>
    );
  } else if (messageType === 4 && conditionNumber === 1) {
    /* 自己发出的 已经回复 的好友请求 conditionNumber：1 messageType: 4  不需要显示按钮 */
    /* 我发出的好友请求，对方给我回复了同意 */
    return (
      <div>
        <List.Item.Meta
          title={<a style={{ color: '#000000' }}>{acceptorId}同意了我的好友请求</a>}
        />
        <Button type="primary" onClick={() => NoticeReply()}>了解了</Button>
      </div>
    );
  } else if (messageType === 4 && conditionNumber === 0) {
    /* 自己发出的 已经回复 的好友请求 conditionNumber：0 messageType: 4  不需要显示按钮 */
    /* 我发出的好友请求，对方给我回复了拒绝 */
    return (
      <div>
        <List.Item.Meta
          title={<a style={{ color: '#000000' }}>{acceptorId}拒绝了我的好友请求</a>}
        />
        <Button type="primary" onClick={() => NoticeReply()}>了解了</Button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    socket: state.app.socket,
    Notice: state.app.Notice,
    NoticeIsReply: state.app.NoticeIsReply,
    NoticeLength: state.app.NoticeLength,
  };
}
export default connect(mapStateToProps)(NoticeType);

