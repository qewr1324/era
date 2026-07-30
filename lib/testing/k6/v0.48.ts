export function generate(params: any): string {
	return `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = 'http://localhost:3000/api';

export default function () {
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token',
    },
  };

  const getUsers = http.get(BASE_URL + '/users', params);
  check(getUsers, {
    'get users status 200': (r) => r.status === 200,
  });

  const payload = JSON.stringify({
    username: 'user_' + Date.now(),
    email: 'user_' + Date.now() + '@example.com',
    password: 'password123',
  });

  const createUser = http.post(BASE_URL + '/users', payload, params);
  check(createUser, {
    'create user status 201': (r) => r.status === 201,
  });

  sleep(1);
}`;
}
