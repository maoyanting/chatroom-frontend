import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Input, message, Button } from 'antd';
import styles from './index.less';
/* 表单的每一个input都是一个Form.Item */


const Register = ({
                 confirmDirty,
                 dispatch,
                 form: {
                   getFieldValue,
                   validateFields,
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
      console.log(values);
      dispatch({ type: 'register/register', payload: values });
    });
  }
  /* 再次输入密码：离开输入框时执行,修改confirmDirty的值 */
  const handleConfirmBlur = (e) => {
    const value = e.target.value;
    /* 修改confirmDirty的值，只要value存在，confirmDirty就为true */
    dispatch({ type: 'register/query', payload: { confirmDirty: confirmDirty || !!value } });
  }
  /* 再次输入密码：自定义校验：验证两次密码是否一致*/
  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('两次密码输入不一致');
    } else {
      callback();
    }
  }
  /* 输入密码：自定义校验：验证密码是否符合规则*/
  const checkConfirm = (rule, value, callback) => {
    if (value && confirmDirty) {
          /* 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件 */
          /* fieldNames即下面的confirm*/
          /* force: true，对已经校验过的表单域，在 onChange 再次被触发时再次校验 */
          /* 如果confirm的输入变化，再次校验输入的密码？？？*/
      validateFields(['confirm'], { force: true });
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
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormItem
        {...formItemLayout}
        label="用户名"
      >
        {getFieldDecorator('userName', {
          rules: [{
            required: true, message: '请输入你的用户名', whitespace: true,
          }, {
            min: 6, max: 12, message: '用户名长度请在6～12之间',
          }],
        })(
          <Input />,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="密码"
      >
        {getFieldDecorator('password', {
          rules: [{
            required: true, message: '请输入你的密码',
          }, {
            min: 6, max: 12, message: '密码长度请在6～12之间',
          }, {
            validator: checkConfirm,
          }],
        })(
          <Input type="password" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="确认密码"
      >
        {getFieldDecorator('confirm', {
          rules: [{
            required: true, message: '请确认你的密码',
          }, {
            validator: checkPassword,
          }],
        })(
          <Input type="password" onBlur={handleConfirmBlur} />,
        )}
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">注册</Button>
      </FormItem>
    </Form>
  );
}

Register.propTypes = {
}
function mapStateToProps(state) {
  return {
    confirmDirty: state.register.confirmDirty,
  };
}
export default connect(mapStateToProps)(Form.create()(Register));

