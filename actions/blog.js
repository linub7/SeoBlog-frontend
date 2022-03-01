import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { handleResponse, isAuth } from './auth';

export const createBlog = async (blog, token) => {
  try {
    let createBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
      createBlogEndpoint = `${API}/api/blog`;
    } else if (isAuth() && isAuth().role === 0) {
      createBlogEndpoint = `${API}/api/user/blog`;
    }
    const response = await fetch(createBlogEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: blog,
    });
    handleResponse(response);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const listRelatedBlogs = async (blog) => {
  try {
    const response = await fetch(`${API}/api/blogs/related`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const listSearch = async (params) => {
  console.log(`search params: ${params}`);
  let query = queryString.stringify(params);
  console.log(`search query: ${query}`);
  try {
    const response = await fetch(`${API}/api/blogs/search?${query}`, {
      method: 'GET',
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getAllBlogs = async (username) => {
  try {
    let getAllBlogsEndpoint;
    if (username) {
      getAllBlogsEndpoint = `${API}/api/${username}/blogs`;
    } else {
      getAllBlogsEndpoint = `${API}/api/blogs`;
    }
    const response = await fetch(getAllBlogsEndpoint, {
      method: 'GET',
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getAllBlogsCategoriesTags = async (skip, limit) => {
  const data = { skip, limit };
  try {
    const response = await fetch(`${API}/api/blogs-categories-tags`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getSingleBlog = async (slug) => {
  try {
    const response = await fetch(`${API}/api/blog/${slug}`, {
      method: 'GET',
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const updateBlog = async (slug, blog, token) => {
  try {
    let updateBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
      updateBlogEndpoint = `${API}/api/blog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
      updateBlogEndpoint = `${API}/api/user/blog/${slug}`;
    }
    const response = await fetch(updateBlogEndpoint, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: blog,
    });
    handleResponse(response);
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const deleteBlog = async (slug, token) => {
  let deleteBlogEndpoint;

  if (isAuth() && isAuth().role === 1) {
    deleteBlogEndpoint = `${API}/api/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    deleteBlogEndpoint = `${API}/api/user/blog/${slug}`;
  }
  try {
    const response = await fetch(deleteBlogEndpoint, {
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

export const getSingleBlogPhoto = async (slug) => {
  try {
    const response = await fetch(`${API}/api/blog/photo/${slug}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
