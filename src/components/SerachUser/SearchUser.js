import React from 'react';
import { connect } from 'dva';
import { Input } from 'antd';
import SearchUserModal from './SearchUserModal';

const Search = Input.Search;

function SearchUser({ dispatch }) {
  function searchUser(value) {
    console.log(value);
    dispatch({ type: 'app/query', payload: { SearchUserVisible: true } });
    dispatch({ type: 'chat/searchUser', payload: { userName: value } });
  }
  return (
    <div>
      <Search
        placeholder="请输入用户名"
        onSearch={value => searchUser(value)}
        style={{ width: 180, margin: '5px'}}
      />
      <SearchUserModal />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    SearchUser: state.app.SearchUser,
  };
}

export default connect(mapStateToProps)(SearchUser);
