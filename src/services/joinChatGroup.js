import request from '../utils/request';

export async function joinChatGroup(data) {
  return request('/api/joinChatGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data),
  });
}

