import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem } from './cartHelpers';

const Card = ({ product, showAddToCartButton = true, cartUpdate = false }) => {
  const [redirect, setRedirect] = useState(false);

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
          className='btn btn-outline-danger mt-2 mb-2'
        >
          Add to card
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>In stock</span>
    ) : (
      <span className='badge badge-danger badge-pill'>Out of Stock</span>
    );
  };

  // const showCartUpdateOptions = cartUpdate => {
  //   return cartUpdate &&
  // }

  return (
    <div className='col-3 mb-3'>
      <div className='card'>
        <div className='card-header'>{product.name}</div>
        <div className='card-body'>
          {shouldRedirect(redirect)}
          <ShowImage item={product} url='product' />
          <p>{product.description.substring(0, 30)}</p>
          <p>€{product.price}</p>
          {showStock(product.quantity)}
          <br />
          <Link to={`/product/${product._id}`}>
            <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
              View Product
            </button>
          </Link>
          {showAddToCart(showAddToCartButton)}
        </div>
      </div>
    </div>
  );
};

export default Card;
