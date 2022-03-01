import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const emailContactForm = async (data) => {
  try {
    let sendEmailEndpoint;

    if (data.authorEmail) {
      sendEmailEndpoint = `${API}/api/contact-blog-author`;
    } else {
      sendEmailEndpoint = `${API}/api/contact`;
    }
    const response = await fetch(sendEmailEndpoint, {
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
