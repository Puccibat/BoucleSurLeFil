import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from './Layout';
import ShowImage from './ShowImage';
import { read } from './apiCore';
import { addItem } from './cartHelpers';

const Product = (product, showAddToCartButton = true) => {
  const [productItem, setProductItem] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductItem(data);
      }
    });
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className='btn btn-outline-warning mt-2 mb-2'
        >
          Add to card
        </button>
      )
    );
  };

  useEffect(() => {
    const productId = product.match.params.productId;
    loadSingleProduct(productId);
  }, []);

  return (
    <div>
      <Layout title='' description='' />
      <div className='container-fluid main'>
        <div className='product-page'>
          <div className='product-page-heading'>
            <h1 className=''>{productItem.name}</h1>
            <h1 className='title-dash'></h1>
            <h2>{productItem.price}€</h2>
          </div>
          <div className='product-details'>{productItem.description}</div>
          {showAddToCart(showAddToCartButton)}
        </div>
        <ShowImage item={productItem} url='product' />
      </div>
    </div>
  );
};

export default Product;
