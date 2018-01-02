import React from 'react';
import { connect } from 'dva';
import { Popover, Icon, Divider } from 'antd';


function SettingList({ dispatch }) {

  function CreateChatGroup() {
    dispatch({ type: 'app/query', payload: { ContentType: 'CreateChatGroup' } });
  }
  const content = (
    <div>
      <a onClick={CreateChatGroup}><Icon type="team" />新建群聊</a>
      <Divider dashed />
      <a><Icon type="setting" />设置</a>
      <Divider dashed />
      <a><Icon type="logout" />退出登录</a>
    </div>
  );
  return (
    <div>
      <Popover placement="bottomRight" content={content}  >
        <Icon type="setting" style={{ fontSize: 25, color: '#ffffff' }} />
      </Popover>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    SearchUser: state.app.SearchUser,
    user: state.app.user,
    CreateChatGroupVisible: state.app.CreateChatGroupVisible,
  };
}
export default connect(mapStateToProps)(SettingList);
