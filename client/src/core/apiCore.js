import { API } from '../config';

export const getProducts = sortBy => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=8`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const read = productId => {
  return fetch(`${API}/product/${productId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const getBraintreeClientToken = token => {
  return fetch(`${API}/braintree/getToken`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};
