/* global window */
/* global document */
/* global location */

export default {
  namespace: 'app',
  state: {
    user: {},
    friendList: {},
    chatList: {},
    chatGroupList: {},
    userTo: {},
    chatGroupTo: {},
    sendMessage: [
      {
        userToId: 1,
        userFromId: 2,
        message: 'Dashboard',
      },
    ],
    socket: {},
    ContentType: '',
    ListType: 'messages',
    SearchUserVisible: false,
    CreateChatGroupVisible: false,
    NoticeListVisible: false,
    DeleteFriendVisible: false,
    Notice: {},
    NoticeLength: 0,
    NoticeIsReply: {},
    SearchUser: {
      introduction: '111',
      userId: 111,
      userName: '111',
      userNickname: '111',
    },
    SearchUserById: {},
  },
  effects: {
    * query({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload,
      });
    },
    * webSocket({ payload, dispatch }, { put }) {
      const socket = new WebSocket('ws://localhost:8080/exampleone/ws');
      const sendUserId = {
        userId: payload,
        messageType: 0,
      };
      socket.onopen = function () {
        console.log('连接成功');
        socket.send(JSON.stringify(sendUserId));
      };
      socket.error = function () {
        console.log('出错了');
      };
      socket.onclose = function () {
        console.log('关闭连接');
      }
      console.log('--------socket--------');
      console.log(socket);
      yield put({
        type: 'updateSocket',
        socket,
      });
    },
  },
  reducers: {
    /* 更新state */
    updateState(state, { payload }) {
      console.log('-----------更新state--------');
      console.log(state);
      return {
        ...state,
        ...payload,
      };
    },
    updateSocket(state, { socket }) {
      console.log('-----------更新socket--------');
      console.log(socket);
      return {
        ...state,
        socket,
      };
    },
    updateChatList(state, { payload }) {
      console.log('-----------更新updateChatList--------');
      console.log(payload);
      return {
        ...state,
        payload,
      };
    },
  },
};
