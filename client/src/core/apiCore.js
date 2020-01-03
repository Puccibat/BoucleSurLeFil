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
