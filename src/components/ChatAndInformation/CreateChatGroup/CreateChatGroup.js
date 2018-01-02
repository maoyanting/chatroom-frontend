import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Input, Avatar, Button } from 'antd';
import styles from './CreateChatGroup.less';
/* 表单的每一个input都是一个Form.Item */


const CreateChatGroup = ({
                    dispatch,
                    userId,
                    form: {
                      getFieldValue,
                      validateFields,
                      getFieldDecorator,
                      validateFieldsAndScroll,
                    },
                  }) => {
  const FormItem = Form.Item;
  /* 群聊信息传输到后端 */
  const chatGroup = {
    ownerId: userId,
    chatGroupName: '',
  };
  function handleSubmit() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      chatGroup.chatGroupName = values.chatGroupName;
      console.log(chatGroup);
      dispatch({ type: 'chat/createChatGroup', payload: chatGroup });
    });
  }

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <img className={styles.img} src="https://www.souid.com/uploads/allimg/170718/4_170718164654_1.gif" />
      <FormItem>
        {getFieldDecorator('chatGroupName', {
          rules: [{
            required: true, message: '请输入你的群名', whitespace: true,
          }, {
            min: 6, max: 12, message: '群名长度请在6～12之间',
          }],
        })(
          <Input placeholder="群名" />,
        )}
      </FormItem>
      <FormItem >
        <Button type="primary" htmlType="submit">新建群聊</Button>
      </FormItem>
    </Form>
  );
}

CreateChatGroup.propTypes = {
}
function mapStateToProps(state) {
  return {
    userId: state.app.user.userId,
  };
}
export default connect(mapStateToProps)(Form.create()(CreateChatGroup));


