import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart } from './cartHelpers';
import Layout from './Layout';
import Card from './Card';
import Checkout from './Checkout';

const Cart = cartUpdate => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

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
              setRun={setRun}
              run={run}
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
          <h2 className='mb-4'>Your cart summary</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
