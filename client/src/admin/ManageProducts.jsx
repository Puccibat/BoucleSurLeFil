import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuth } from '../auth/index';
import { getProducts, deleteProduct } from './ApiAdmin';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuth();

  const loadProducts = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout className='container'>
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center'>
            Nombre total de produit: {products.length}
          </h2>
          <hr />
          <ul className='list-group'>
            {products.map((product, index) => (
              <li
                key={index}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{product.name}</strong>
                <Link to={`/admin/product/update/${product._id}`}>
                  <button className='btn btn-warning'>Mettre à jour</button>
                </Link>
                <button
                  onClick={() => destroy(product._id)}
                  className='btn btn-danger'
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
