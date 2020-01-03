import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import ShowImage from './ShowImage';
import { read } from './apiCore';

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
      <ShowImage item={product} url='product' />
      <h2 className='mb-4'>{product.name}</h2>
      <div className='row'>{product.description}</div>
    </Layout>
  );
};

export default Product;
