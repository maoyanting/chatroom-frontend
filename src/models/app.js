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
    InputMessage: '',
    sendMessage: [
      {
        userToId: 1,
        userFromId: 2,
        message: 'Dashboard',
      },
    ],
    groupMessage: [
      {
        userToId: 1,
        chatGroupId: '',
        userFromId: 2,
        message: 'Dashboard',
      },
    ],
    socket: {},
    ContentType: '',
    ListType: 'contacts',
    SearchUserVisible: false,
    CreateChatGroupVisible: false,
    NoticeListVisible: false,
    DeleteFriendVisible: false,
    QuitChatGroupVisible: false,
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
      socket.onopen = function () {
        console.log('webSocket连接成功---------------');
      };
      socket.error = function () {
        console.log('出错了---------------');
      };
      socket.onclose = function () {
        console.log('关闭websocket连接---------------');
      }
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
