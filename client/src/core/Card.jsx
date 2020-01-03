import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

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

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => removeItem(product._id)}
          className='btn btn-outline-danger mt-2 mb-2'
        >
          Remove Product
        </button>
      )
    );
  };

  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust Quantity</span>
            </div>
            <input
              type='number'
              className='form-control'
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
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

  return (
    <div className='col-3 mb-3'>
      <div className='card'>
        <div className='card-header'>{product.name}</div>
        <div className='card-body'>
          {shouldRedirect(redirect)}
          <ShowImage item={product} url='product' />
          <p>{product.description}</p>
          <p>€{product.price}</p>
          {showStock(product.quantity)}
          <br />
          <Link to={`/product/${product._id}`}>
            <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
              View Product
            </button>
          </Link>
          {showAddToCart(showAddToCartButton)}
          {showCartUpdateOptions(cartUpdate)}
          {showRemoveButton(showRemoveProductButton)}
        </div>
      </div>
    </div>
  );
};

export default Card;
