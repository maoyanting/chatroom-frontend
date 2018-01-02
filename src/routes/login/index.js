import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input } from 'antd';
import styles from './index.less';
/* 表单的每一个input都是一个Form.Item */
const FormItem = Form.Item;

const Login = ({
                 loading,
                 dispatch,
                 form: {
                   getFieldDecorator,
                   validateFieldsAndScroll,
                 },
               }) => {
  /* 验证，成功则调用login */
  /* type的值为model暴露给全局的接口，payload为传递的参数名*/
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      dispatch({ type: 'login/login', payload: values });
    });
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <div className={styles.welcome} />
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message: '请填写用户名',
              },
            ],
          })(<Input size="large" onPressEnter={handleOk} placeholder="用户名" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
            ],
          })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" />)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading={loading.effects.login}>
            登录
          </Button>
        </Row>
      </form>
    </div>
  );
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
/* 调用Form.create()API将表单实际创建出来，之前只是定义，现在才是真正的创建，创建后导出以供其他模块调用*/
/* connect用于连接组件 */
/* 这里的loading是什么意思暂时不知道 */
export default connect(({ loading }) => ({ loading }))(Form.create()(Login));

