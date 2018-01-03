import React from 'react';
import PropTypes from 'prop-types';
import UserInformation from './UserInformation/UserInformation';
import ChatGroupInformation from './ChatGroupInformation/ChatGroupInformation';
import BlankChatAndInformation from './BlankChatAndInformation';
import PersonalChatRoom from './PersonalChatRoom/ChatWebSocket';
import GroupChatRoom from './GroupChatRoom/ChatWebSocket';
import CreateChatGroup from './CreateChatGroup/CreateChatGroup';


const ChatAndInformation = ({ ContentType }) => {
  if (ContentType === 'UserInformation') return (<UserInformation />);
  if (ContentType === 'ChatGroupInformation') return (<ChatGroupInformation />);
  if (ContentType === 'PersonalChatRoom') return (<PersonalChatRoom />);
  if (ContentType === 'GroupChatRoom') return (<GroupChatRoom />);
  if (ContentType === 'CreateChatGroup') return (<CreateChatGroup />);
  return (<BlankChatAndInformation />);
}
ChatAndInformation.propTypes = {
  ContentType: PropTypes.string,
}
export default ChatAndInformation;
