export const API_ERROR = 'API_ERROR';


const parseResponse = (res) => {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res.json();
};

export const postRequest = (endpoint, payload) => {
  const config = {
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify(payload),
  };
  return fetch(`${endpoint}`, config)
    .then(parseResponse);
};

export const putRequest = (endpoint, payload) => {
  const config = {
    credentials: 'same-origin',
    method: 'PUT',
    body: JSON.stringify(payload),
  };
  return fetch(`${endpoint}`, config)
    .then(parseResponse);
};

export const getRequest = (endpoint) => {
  const config = {
    credentials: 'same-origin',
    method: 'GET',
  };
  return fetch(`${endpoint}`, config)
    .then(parseResponse);
};

export const deleteRequest = (endpoint) => {
  const config = {
    credentials: 'same-origin',
    method: 'DELETE',
  };
  return fetch(`${endpoint}`, config)
    .then(parseResponse);
};
