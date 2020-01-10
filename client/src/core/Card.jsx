import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
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
          Ajouter au panier
        </button>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className='btn btn-outline-danger mt-2 mb-2'
        >
          Retirer produit
        </button>
      )
    );
  };

  const handleChange = productId => event => {
    setRun(!run);
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
              <span className='input-group-text'>Quantité</span>
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
      <span className='badge badge-primary badge-pill'>Disponible</span>
    ) : (
      <span className='badge badge-danger badge-pill'>Rupture</span>
    );
  };

  return (
    <div className='col-sm-3 mb-3 card-group'>
      <div className='card'>
        <div className='card-header' style={{ fontSize: '25px' }}>
          {product.name}
        </div>
        <div className='card-body'>
          {shouldRedirect(redirect)}
          <ShowImage item={product} url='product' />
          <p className='heading' style={{ fontSize: '25px', color: '#951616' }}>
            {product.price}€
          </p>
          <span>{showStock(product.quantity)}</span>
          <br />
        </div>
        <div className='card-footer'>
          <Link to={`/product/${product._id}`}>
            <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
              Voir le produit
            </button>
          </Link>
          {product.quantity > 0 ? showAddToCart(showAddToCartButton) : ''}
          {showCartUpdateOptions(cartUpdate)}
          {showRemoveButton(showRemoveProductButton)}
        </div>
      </div>
    </div>
  );
};

export default Card;
