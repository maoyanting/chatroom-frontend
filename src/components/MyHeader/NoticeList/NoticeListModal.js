import React from 'react';
import { connect } from 'dva';
import { Modal, List, Divider } from 'antd';
import NoticeType from './NoticeType';
import NoticeIsReplyType from './NoticeIsReplyType';


function NoticeListModal({ NoticeListVisible, dispatch, Notice, NoticeIsReply }) {
  function handleCancel() {
    dispatch({ type: 'app/query', payload: { NoticeListVisible: false, NoticeLength: Notice.length } });
  }
  return (<Modal
    title="好友请求列表"
    visible={NoticeListVisible}
    onCancel={handleCancel}
    footer={null}
  >
    <List
      itemLayout="horizontal"
      dataSource={Notice}
      renderItem={item => (
        <List.Item >
          <NoticeType friendRequest={item} />
        </List.Item>
      )}
    />
    <Divider>已回复</Divider>
    <List
      itemLayout="horizontal"
      dataSource={NoticeIsReply}
      renderItem={item => (
        <List.Item >
          <NoticeIsReplyType NoticeIsReply={item} />
        </List.Item>
      )}
    />
  </Modal>);

}
function mapStateToProps(state) {
  return {
    NoticeListVisible: state.app.NoticeListVisible,
    Notice: state.app.Notice,
    NoticeIsReply: state.app.NoticeIsReply,
    NoticeLength: state.app.NoticeLength,
  };
}

export default connect(mapStateToProps)(NoticeListModal);
