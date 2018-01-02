import React from 'react';
import PropTypes from 'prop-types';
import UserInformation from './UserInformation/UserInformation';
import BlankChatAndInformation from './BlankChatAndInformation';
import ChatWebSocket from './ChatWebSocket/ChatWebSocket';
import CreateChatGroup from './CreateChatGroup/CreateChatGroup';


const ChatAndInformation = ({ ContentType }) => {
  if (ContentType === 'UserInformation') return (<UserInformation />);
  if (ContentType === 'ChatWebSocket') return (<ChatWebSocket />);
  if (ContentType === 'CreateChatGroup') return (<CreateChatGroup />);
  return (<BlankChatAndInformation />);
}
ChatAndInformation.propTypes = {
  ContentType: PropTypes.string,
}
export default ChatAndInformation;
