import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read } from './apiCore';
import Card from './Card';

const Product = props => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, []);

  return (
    <Layout title='' description='' className='container-fluid'>
      <h2 className='mb-4'>{product.name}</h2>
      <div className='row'>{product.description}</div>
    </Layout>
  );
};

export default Product;
