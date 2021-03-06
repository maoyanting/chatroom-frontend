import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  getFriendList, quitChatGroup, createChatGroup, getChatGroupList,
  searchUser, addFriend, deleteFriend, searchUserById,
  getMyself, logout } from '../services/chat';

export default {
  namespace: 'chat',
  state: {
  },
  effects: {
    * query({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload,
      });
    },
    * webSocket({ put }) {
      yield put({ type: 'app/updateWebSocket' });
    },
    * logout({ payload }, { call, put }) {
      const { data } = yield call(logout);
      console.log('退出登录：后端传过来的数据------------------');
      console.log(data);
      yield put(routerRedux.push('/home'));
      message.success('退出登录成功');
    },
    * searchUser({
                   payload,
                 }, { call, put }) {
      console.log('查询用户：给后端的用户数据------------------');
      console.log(payload);
      const { data } = yield call(searchUser, payload);
      console.log('查询用户：后端传过来的数据------------------');
      console.log(data);
      if (data.resCode === 1) {
        const SearchUser = { SearchUser: data.data };
        console.log('成功查询到用户：这个是个陌生人哦');
        yield put({ type: 'app/query', payload: SearchUser });
      }
      if (data.resCode === 2) {
        console.log('成功查询到用户：这个是你的好友哦');
        const MyFriend = {
          userName: data.data.userName,
          userNickname: data.data.userNickname,
          introduction: data.data.introduction,
          userId: 222,
        };
        const SearchUser = { SearchUser: MyFriend };
        yield put({ type: 'app/query', payload: SearchUser });
      }
      if (data.resCode === 0) {
        const SearchUser = { SearchUser: { userId: 111 } };
        console.log('没有查询到用户');
        yield put({ type: 'app/query', payload: SearchUser });
      }
    },
    * addChatList({
                   payload,
                 }, { call, put }) {
      console.log('-------------------聊天列表查询用户信息：给后端的用户数据------------------');
      console.log(payload);
      const { data } = yield call(searchUserById, payload);
      console.log('-------------------聊天列表查询用户信息：后端传过来的数据------------------');
      console.log(data);
      const SearchUserById = { SearchUserById: data.data };
      yield put({ type: 'app/query', payload: SearchUserById });
    },
    * addFriend({
                   payload,
                 }, { call, put }) {
      console.log('-------------------发送好友请求：给后端的用户数据------------------');
      console.log(payload);
      const { data } = yield call(addFriend, payload);
      console.log('-------------------发送好友请求：后端传过来的数据------------------');
      console.log(data);
      if (data.resCode === 1) {
        const SearchUser = { SearchUser: data.data };
        console.log('发送好友请求成功');
        yield put({ type: 'app/query', payload: SearchUser });
      } else {
        const SearchUser = { SearchUser: { userId: 111 } };
        console.log('发送好友请求失败');
        yield put({ type: 'app/query', payload: SearchUser });
      }
    },
    * deleteFriend({
                  payload,
                }, { call, put }) {
      console.log('-------------------发送删除好友请求：给后端的用户数据------------------');
      console.log(payload);
      const { data } = yield call(deleteFriend, payload);
      console.log('-------------------发送删除好友请求：后端传过来的数据------------------');
      console.log(data);
      if (data.resCode === 1) {
        yield put({ type: 'getFriendList' });
        yield put({ type: 'app/query', payload: { ContentType: 'BlankChatAndInformation' } });
        console.log('删除好友成功');
      } else {
        console.log('删除好友失败');
      }
    },
    * getFriendList({
                                payload,
                              }, { call, put, select }) {
      /* 获取好友列表 */
      const { user } = yield select(_ => _.app)
      console.log('获取好友列表：给后端的用户数据------------------');
      console.log(user);
      const { data } = yield call(getFriendList, user);
      console.log('获取好友列表：后端传过来的数据----------------------');
      console.log(data);
      const friendList = { friendList: data.data };
      yield put({ type: 'app/query', payload: friendList });
    },
    * getChatGroupList({
                      payload,
                    }, { call, put, select }) {
      /* 获取群列表 */
      const { user } = yield select(_ => _.app)
      console.log('获取群列表：给后端的用户数据------------------');
      console.log(user);
      const { data } = yield call(getChatGroupList, user);
      console.log('获取群列表：后端传过来的数据----------------------');
      console.log(data);
      const chatGroupList = { chatGroupList: data.data };
      yield put({ type: 'app/query', payload: chatGroupList });
    },
    * getMyself({
                  payload,
                },{ call, put }) {
      const { data } = yield call(getMyself);
      console.log('获取user：后端传过来的数据----------------------');
      console.log(data);
      const user = { user: data.data };
      if (data.resCode === 1) {
        yield put({ type: 'app/query', payload: user });
      } else {
        yield put(routerRedux.push('/error'));
        message.error('没有登录');
      }
    },
    * createChatGroup({
                                  payload,
                                }, { call, put }) {
      /* 新建群聊 */
      console.log('新建群：给后端的用户数据------------------');
      console.log(payload);
      const { data } = yield call(createChatGroup, payload);
      console.log('新建群：后端传过来的数据----------------------');
      console.log(data);
      yield put({ type: 'getChatGroupList' });
      // const chatGroupTo = { chatGroupTo: data.data };
      // yield put({ type: 'app/query', payload: chatGroupTo });
    },
    * quitChatGroup({
                        payload,
                      }, { call, put }) {
      /* 退出群聊 */
      console.log('退出群：给后端的用户数据------------------');
      console.log(payload);
      const { data } = yield call(quitChatGroup, payload);
      console.log('退出群：后端传过来的数据----------------------');
      console.log(data);
      yield put({ type: 'getChatGroupList' });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setWebSocket(state) {
      return {
        ...state,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/chat') {
          dispatch({
            type: 'getMyself',
          });
          dispatch({
            type: 'getFriendList',
          });
          dispatch({
            type: 'getChatGroupList',
          });
          dispatch({
            type: 'app/webSocket',
          });
        }
      });
    },
  },
};
