import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart } from './cartHelpers';
import Layout from './Layout';
import Card from './Card';

const Cart = cartUpdate => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, [items]);

  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        <div className='row'>
          {items.map((product, index) => (
            <Card
              key={index}
              product={product}
              showAddToCartButton={false}
              cartUpdate={true}
              showRemoveProductButton={true}
            />
          ))}
        </div>
      </div>
    );
  };

  const noItemsMessage = () => {
    return (
      <div>
        <h2>
          Your cart is empty <br /> <Link to='/'>Continue shopping</Link>
        </h2>
        ;
      </div>
    );
  };

  return (
    <div>
      <Layout
        title='Shopping Cart'
        description='BoucleSurLeFil'
        className='container-fluid'
      />
      <div className='row'>
        <div className='col-8'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className='col-4'>
          <p>Show checkout, shipping adress/total/update quantity</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
