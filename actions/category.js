import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from './auth';

export const getCategories = async () => {
  try {
    const response = await fetch(`${API}/api/categories`, { method: 'GET' });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getSingleCategory = async (slug) => {
  try {
    const response = await fetch(`${API}/api/category/${slug}`, {
      method: 'GET',
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const createCategory = async (category, token) => {
  try {
    const response = await fetch(`${API}/api/category`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    handleResponse(response);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const removeCategory = async (slug, token) => {
  try {
    const response = await fetch(`${API}/api/category/${slug}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    handleResponse(response);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
