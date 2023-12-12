import { expect, request } from '@playwright/test';
import { AUTH_URL } from './constants';

export async function getAuthToken(username: string, password: string) {
  const contextRequest = await request.newContext();
  const authResponse = await contextRequest.post(AUTH_URL, {
    data: {
      username: username,
      password: password,
    },
  });

  expect(authResponse.ok()).toBeTruthy();
  const body = await authResponse.json();
  return body.token;
}
