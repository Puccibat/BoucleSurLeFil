import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from './Layout';
import Categories from './Categories';
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
    addItem(productItem, () => {
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
          className='btn btn-outline-danger mt-2 mb-2'
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
      <Layout
        title='Product Page'
        description='BoucleSurLeFil'
        className='container-fluid'
      />
      <div className='row justify-content-center'>
        <Categories />
      </div>
      <div className='container main mt-5'>
        <div className='product-page row'>
          <div className='col-2'></div>
          <div className='product-page-heading col-4'>
            <h1 className=''>{productItem.name}</h1>
            <h1 className='title-dash'></h1>
            <h2>{productItem.price}€</h2>
            <div className='product-details'>{productItem.description}</div>
            {showAddToCart(showAddToCartButton)}
          </div>
          <div className='imageProduct col-4'>
            <ShowImage item={productItem} url='product' />
          </div>
          <div className='col-2'></div>
        </div>
      </div>
    </div>
  );
};

export default Product;
