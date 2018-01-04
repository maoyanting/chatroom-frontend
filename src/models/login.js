import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { login } from '../services/login';

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login({
              payload,
            }, { call, put }) {
      console.log('登录：前端发过去的数据----------------');
      console.log(payload);
      const { data } = yield call(login, payload);
      console.log('登录：后端传过来的数据----------------------');
      console.log(data);
      const user = { user: data.data };
      if (data.resCode === 1) {
        yield put({ type: 'app/query', payload: user });
        // yield put({ type: 'app/webSocket', payload: user.user.userId });
        yield put(routerRedux.push('/chat'));
      } else {
        message.error('密码错误');
      }
    },
  },
};
