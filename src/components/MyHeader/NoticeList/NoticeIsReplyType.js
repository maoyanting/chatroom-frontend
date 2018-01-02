import React from 'react';
import { connect } from 'dva';
import { List } from 'antd';


const NoticeIsReplyType = ({ NoticeIsReply }) => {
  const { initiatorId, acceptorId, conditionNumber, messageType } = NoticeIsReply;
  if (messageType === 3 && conditionNumber === 1) {
    /* 收到的 但是已经回复 的好友请求 conditionNumber：1 messageType: 3  不需要显示按钮 */
    /* 我收到的好友请求，我已经回复了同意 */
    return (
      <List.Item.Meta
        title={<a style={{ color: '#000000' }}>我同意了{initiatorId}的好友请求</a>}
      />
    );
  } else if (messageType === 3 && conditionNumber === 0) {
    /* 收到的 但是已经回复 的好友请求 conditionNumber：0 messageType: 3  不需要显示按钮 */
    /* 我收到的好友请求，我已经回复了拒绝 */
    return (
      <List.Item.Meta
        title={<a style={{ color: '#000000' }}>我拒绝了{initiatorId}的好友请求</a>}
      />
    );
  } else if (messageType === 4 && conditionNumber === 1) {
    /* 自己发出的 已经回复 的好友请求 conditionNumber：1 messageType: 4  不需要显示按钮 */
    /* 我发出的好友请求，对方给我回复了同意 */
    return (
        <List.Item.Meta
          title={<a style={{ color: '#000000' }}>{acceptorId}同意了我的好友请求</a>}
        />
    );
  } else if (messageType === 4 && conditionNumber === 0) {
    /* 自己发出的 已经回复 的好友请求 conditionNumber：0 messageType: 4  不需要显示按钮 */
    /* 我发出的好友请求，对方给我回复了拒绝 */
    return (
        <List.Item.Meta
          title={<a style={{ color: '#000000' }}>{acceptorId}拒绝了我的好友请求</a>}
        />
    );
  } else {
    return (<div></div>);
  }
}

export default NoticeIsReplyType;

