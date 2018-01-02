import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { register } from '../services/register';

export default {
  namespace: 'register',

  state: {
    confirmDirty: false,
  },

  effects: {
    * query({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload,
      });
    },
    // * checkUserName({ payload }, { call, put }) {
    //   console.log('-----------------注册检测用户名重复：前端发过去的数据----------------');
    //   console.log(payload);
    //   const { data } = yield call(checkUserName, payload);
    //   console.log('------------------注册检测用户名重复：后端传过来的数据----------------------');
    //   console.log(data);
    //   if (data.resCode === 1) {
    //     yield put({ type: 'query', payload: { checkUserName: 'true' } });
    //   } else {
    //     yield put({ type: 'query', payload: { checkUserName: 'false' } });
    //   }
    // },
    * register({
              payload,
            }, { call, put }) {
      console.log('-----------------注册：前端发过去的数据----------------');
      console.log(payload);
      yield put(routerRedux.push('/register'));
      const { data } = yield call(register, payload);
      console.log('------------------注册：后端传过来的数据----------------------');
      console.log(data);
      if (data.resCode === 1) {
        const user = { user: data.data };
        console.log('------------------data.resCode === 1----------------------');
        yield put({ type: 'app/query', payload: user });
        yield put({ type: 'app/webSocket', payload: user.user.userId });
        yield put(routerRedux.push('/chat'));
      } else {
        console.log('------------------data.resCode === 0----------------------');
        yield put(routerRedux.push('/register'));
        message.error('用户名已经被使用 请换一个');
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      console.log('-----------更新state--------');
      console.log(state);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
