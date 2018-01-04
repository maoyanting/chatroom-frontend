import request from '../utils/request';

// 获取config中的api，再获取api中的userLogin
// 把这个import到model里面去
export async function getFriendList(userId) {
  return request('/api/friendList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(userId),
  });
}
export function getChatGroupList(userId) {
  return request('/api/chatGroupList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(userId),
  });
}
export function getMyself() {
  return request('/api/getMyself', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
  });
}
export function createChatGroup(data) {
  return request('/api/createChatGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data),
  });
}
export function quitChatGroup(data) {
  return request('/api/quitChatGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data),
  });
}
export function searchUser(userName) {
  return request('/api/searchUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(userName),
  });
}
export function searchUserById(data) {
  return request('/api/searchUserById', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data),
  });
}
export function addFriend(data) {
  return request('/api/addFriend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data),
  });
}
export function deleteFriend(data) {
  return request('/api/deleteFriend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data),
  });
}
export function logout(data) {
  return request('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data),
  });
}

