import React from 'react';
import PropTypes from 'prop-types';
import FriendList from './FriendList/FriendList';
import ChatGroupList from './ChatGroupList/ChatGroupList';
import ChatList from './ChatList/ChatList';


const ChangeListType = ({ ListType }) => {
  if (ListType === 'messages') return (<ChatList />);
  if (ListType === 'contacts') return (<FriendList />);
  if (ListType === 'chatGroup') return (<ChatGroupList />);
  return (<div>群列表</div>);
}
ChangeListType.propTypes = {
  ListType: PropTypes.string,
}
export default ChangeListType;
