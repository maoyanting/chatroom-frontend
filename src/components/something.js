import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Input, Tooltip, Icon, Select, Checkbox, Button, AutoComplete } from 'antd';
import styles from './index.less';
/* 表单的每一个input都是一个Form.Item */


const Login = ({
                 confirmDirty,
                 dispatch,
                 form: {
                   getFieldDecorator,
                   validateFieldsAndScroll,
                 },
               }) => {
  const FormItem = Form.Item;
  /* 注册信息传输到后端 */
  function handleSubmit() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      dispatch({ type: 'register/register', payload: values });
    });
  }
  /* 在用户离开输入框时执行 */
  function handleConfirmBlur(event) {
    const value = event.target.value;
    dispatch({ type: 'register/query', payload: { confirmDirty: confirmDirty || !!value } });
  }
  /* 自定义校验：验证两次密码是否一致*/
  function checkPassword({ value, callback}) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致');
    } else {
      callback();
    }
  }
  /* 自定义校验：验证密码是否符合规则*/
  function checkConfirm({ value, callback}) {
    const form = this.props.form;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  /* 布局样式 */
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem
        {...formItemLayout}
        label="E-mail"
      >
        {getFieldDecorator('userName', {
          rules: [{
            type: 'userName', message: '用户名无效',
          }, {
            required: true, message: '请输入你的用户名',
          }],
        })(
          <Input />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="Password"
      >
        {getFieldDecorator('password', {
          rules: [{
            required: true, message: '请输入你的密码',
          }, {
            validator: checkConfirm,
          }],
        })(
          <Input type="password" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="Confirm Password"
      >
        {getFieldDecorator('confirm', {
          rules: [{
            required: true, message: '请确认你的密码',
          }, {
            validator: checkPassword,
          }],
        })(
          <Input type="password" onBlur={handleConfirmBlur} />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={(
          <span>
              Nickname&nbsp;
            <Tooltip title="你希望别人怎么称呼你?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
        )}
      >
        {getFieldDecorator('nickname', {
          rules: [{ required: true, message: '请输入你的昵称', whitespace: true }],
        })(
          <Input />
        )}
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        {getFieldDecorator('agreement', {
          valuePropName: 'checked',
        })(
          <Checkbox>我已经阅读了 <a href="">用户守则</a></Checkbox>
        )}
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">注册</Button>
      </FormItem>
    </Form>
  );
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
}
function mapStateToProps(state) {
  return {
    confirmDirty: state.register.confirmDirty,
  };
}
export default connect(mapStateToProps)(Form.create()(Login));

