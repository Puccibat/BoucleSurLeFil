import { API } from '../config';

export const getProducts = (sortBy, limit) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=${limit}`, {
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

export const getProductsByCategory = categoryId => {
  return fetch(`${API}/products/productsByCategory/${categoryId}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
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

export const processPayment = (token, paymentData) => {
  return fetch(`${API}/braintree/payment`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(paymentData)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const createOrder = (token, createOrderData) => {
  return fetch(`${API}/order/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ order: createOrderData })
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};
