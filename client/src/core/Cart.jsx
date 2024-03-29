import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart } from './cartHelpers';
import Layout from './Layout';
import Card from './Card';
import Checkout from './Checkout';
import Footer from './Footer';

const Cart = cartUpdate => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = items => {
    return (
      <div className='container'>
        <h2 className='fontSnd'>Vous avez {`${items.length}`} produit(s)</h2>
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
      <div className='container'>
        <h2 className='fontSnd'>
          Votre panier est vide <br />{' '}
          <Link to='/' style={{ color: '#000000' }}>
            Continuer mes achats
          </Link>
        </h2>
      </div>
    );
  };

  return (
    <div>
      <Layout className='container-fluid' />
      <div>{items.length > 0 ? showItems(items) : noItemsMessage()}</div>
      <div className='container'>
        <h2 className='mb-4 mt-5 fontSnd'>Votre panier</h2>
        <hr />
        <Checkout setRun={setRun} products={items} />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
