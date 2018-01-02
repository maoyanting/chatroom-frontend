import React from 'react';
import { Divider, Icon } from 'antd';

function BlankChatAndInformation() {
  return (
    <div>
      <div style={{ padding: 20, width: 200, height: 31}} />
      <Divider />
      <Icon type="wechat" style={{ padding: 0, fontSize: 120, opacity: 0.2 }} />
      <div style={{ padding: 0, minHeight: 360, opacity: 0.2 }}>
        未选择聊天
      </div>
    </div>
  );
}

export default BlankChatAndInformation;
