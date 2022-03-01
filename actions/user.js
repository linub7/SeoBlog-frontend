import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from './auth';

export const getPublicProfile = async (username) => {
  try {
    const response = await fetch(`${API}/api/user/${username}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getProfile = async (token) => {
  try {
    const response = await fetch(`${API}/api/user/profile`, {
      method: 'GET',
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    });
    handleResponse(response);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const update = async (token, user) => {
  try {
    const response = await fetch(`${API}/api/user/update`, {
      method: 'PUT',
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      body: user,
    });
    handleResponse(response);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
