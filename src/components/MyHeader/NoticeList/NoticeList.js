import React from 'react';
import { connect } from 'dva';
import { Icon, Badge } from 'antd';
import NoticeListModal from './NoticeListModal';

function NoticeList({ dispatch, NoticeLength }) {
  function showModal() {
    dispatch({ type: 'app/query', payload: { NoticeListVisible: true } });
  }
  return (
    <div>
      <Badge count={NoticeLength}>
        <Icon type="mail" style={{ fontSize: 25, color: '#ffffff' }} onClick={showModal} />
        <NoticeListModal />
      </Badge>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    NoticeLength: state.app.NoticeLength,
  };
}

export default connect(mapStateToProps)(NoticeList);
