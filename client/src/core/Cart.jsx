import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart } from './cartHelpers';
import Layout from './Layout';
import Card from './Card';

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => {
    return (
      <div>
        <h2>
          Your cart is empty <br /> <Link to='/shop'>Continue shopping</Link>
        </h2>
        ;
      </div>
    );
  };

  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-6'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className='col-6'>
          <p>Show checkout, shipping adress/total/update quantity</p>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
