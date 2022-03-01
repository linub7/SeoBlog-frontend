import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { API } from '../config';
import Router from 'next/router';

export const handleResponse = (response) => {
  if (response.status === 401) {
    signout(() => {
      Router.push({
        pathname: '/signin',
        query: {
          message: 'Your session expired. Please signin again',
        },
      });
    });
  } else {
    return;
  }
};

export const signup = async (user) => {
  try {
    const response = await fetch(`${API}/api/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const signin = async (user) => {
  try {
    const response = await fetch(`${API}/api/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const signout = async (next) => {
  removeCookie('token');
  removeLocalStorage('user');
  next();

  try {
    const response = await fetch(`${API}/api/signout`, { method: 'GET' });
    return console.log('signout success');
  } catch (error) {
    return console.log(error);
  }
};

// cookies
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, { expires: 1 });
  }
};

export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, { expires: 1 });
  }
};

// localStorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// authenticate
export const authenticate = (data, next) => {
  setCookie('token', data.token);
  setLocalStorage('user', data.user);

  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};

export const updateUser = (user, next) => {
  if (process.browser) {
    if (localStorage.getItem('user')) {
      let auth = JSON.parse(localStorage.getItem('user'));
      auth = user;
      localStorage.setItem('user', JSON.stringify(auth));
      next();
    }
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API}/api/forgot-password`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const resetPassword = async (resetInfo) => {
  try {
    const response = await fetch(`${API}/api/reset-password`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetInfo),
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};
