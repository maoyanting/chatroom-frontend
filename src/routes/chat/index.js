import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import {Layout} from 'antd';
import styles from './index.less';
import ListLayout from '../../components/ListLayout/ListLayout';
import SearchUser from '../../components/SerachUser/SearchUser';
import ChatAndInformation from '../../components/ChatAndInformation/ChatAndInformation';
import MyHeader from '../../components/MyHeader/MyHeader';

const { Sider } = Layout;

const Chat = ({userNickname, SearchUserById, chatList, ContentType, dispatch, sendMessage, socket, Notice, NoticeLength, groupMessage }) => {
  socket.onmessage = function (event) {
    const sendMessageNew = JSON.parse(event.data);
    if (sendMessageNew.messageType === 3) {
      console.log('收到一条好友请求：后端发过来的数据');
      console.log(event.data);
      dispatch({type: 'app/query', payload: {Notice: [...Notice, sendMessageNew], NoticeLength: NoticeLength + 1}});
    } else if (sendMessageNew.messageType === 4) {
      console.log('收到一条好友请求的回复：后端发过来的数据');
      console.log(event.data);
      dispatch({type: 'app/query', payload: {Notice: [...Notice, sendMessageNew], NoticeLength: NoticeLength + 1}});
    } else if (sendMessageNew.messageType === 1) {
      console.log('收到一条私聊消息：后端发过来的数据');
      console.log(event.data);
      /* 获取聊天的对象id */
      const { userFromId } = sendMessageNew;
      // dispatch({ type: 'app/query', payload: { chatList: [...chatList, userFromId]}});
      dispatch({ type: 'chat/addChatList', payload: { userId: userFromId } });
      dispatch({ type: 'app/query', payload: { chatList: [...chatList, SearchUserById]}});
      dispatch({ type: 'app/query', payload: { sendMessage: [...sendMessage, sendMessageNew]}});
    } else if (sendMessageNew.messageType === 2) {
      console.log('收到一条群聊消息：后端发过来的数据');
      console.log(event.data);
      /* 获取聊天的对象id */
      // const { userFromId } = sendMessageNew;
      // dispatch({ type: 'chat/addChatList', payload: { userId: userFromId } });
      // dispatch({ type: 'app/query', payload: { chatList: [...chatList, SearchUserById]}});
      dispatch({ type: 'app/query', payload: { groupMessage: [...groupMessage, sendMessageNew]}});
    }
  };
  return (
    <Layout className={styles.Layout}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <MyHeader userNickname={userNickname} />
        <SearchUser />
        <ListLayout />
      </Sider>
      <Layout>
        <ChatAndInformation ContentType={ContentType} style={{ margin: '0px 16px' }} />
      </Layout>
    </Layout>
  );
}
Chat.propTypes = {
  userNickname: PropTypes.string,
  ContentType: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    userId: state.app.user.userId,
    chatList: state.app.chatList,
    userNickname: state.app.user.userNickname,
    ContentType: state.app.ContentType,
    sendMessage: state.app.sendMessage,
    groupMessage: state.app.groupMessage,
    socket: state.app.socket,
    Notice: state.app.Notice,
    NoticeLength: state.app.NoticeLength,
    SearchUserById: state.app.SearchUserById,
  };
}
export default connect(mapStateToProps)(Chat);

