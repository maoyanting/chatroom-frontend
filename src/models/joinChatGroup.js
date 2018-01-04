import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import { joinChatGroup } from '../services/joinChatGroup';

export default {
  namespace: 'joinChatGroup',

  state: {},

  effects: {
    * joinChatGroup({
              payload,
            }, { call, put }) {
      // const UserGroupMapping = { chatGroupId: payload };
      console.log('进入群：前端发过去的数据----------------');
      console.log(payload);
      const { data } = yield call(joinChatGroup, payload);
      console.log('进入群：后端传过来的数据----------------------');
      console.log(data);
      if (data.resCode === 1) {
        yield put(routerRedux.push('/chat'));
        message.success('进群成功');
      }
      if (data.resCode === 2) {
        yield put(routerRedux.push('/chat'));
        message.success('你已经在群里面了');
      }
      if (data.resCode === 0) {
        yield put(routerRedux.push('/error'));
        message.error('进群失败');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/toJoinChatGroup/:chatGroupId').exec(pathname);
        if (match) {
          const chatGroupId = match[1];
          dispatch({
            type: 'joinChatGroup',
            payload: { chatGroupId },
          });
        }
      });
    },
  },
};
