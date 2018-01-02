import request from '../utils/request';

export async function register(data) {
  return request('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data),
  });
}
export function checkUserName(data) {
  return request('/api/register/checkUserName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(data),
  });
}

