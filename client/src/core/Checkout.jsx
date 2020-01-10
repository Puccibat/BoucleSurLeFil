import React, { useState, useEffect } from 'react';
import {
  getBraintreeClientToken,
  processPayment,
  createOrder
} from './apiCore';
import { emptyCart } from './cartHelpers';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    clientName: '',
    address: ''
  });

  const getToken = token => {
    getBraintreeClientToken(token).then(data => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleAddress = event => {
    setData({ ...data, address: event.target.value });
  };

  const handleClientName = event => {
    setData({ ...data, clientName: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const deliveryAddress = data.address;
  const deliveryName = data.clientName;

  const buy = () => {
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then(data => {
        // console.log(data);
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products)
        };

        processPayment(data, paymentData)
          .then(response => {
            console.log(response);

            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
              clientName: deliveryName,
              orderDate: Date.now()
            };

            createOrder(data, createOrderData);

            setData({ ...data, success: response.success });
            emptyCart(() => {
              setRun(!run);
              console.log('payment success and empty cart');
            });
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        // console.log('dropin error: ', error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div
      className='container mb-5 fontSnd'
      onBlur={() => setData({ ...data, error: '' })}
    >
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className='from-row'>
            <div className='form-group mb-3'>
              <label className='text-muted'>Nom de livraison:</label>
              <input
                onChange={handleClientName}
                className='form-control'
                value={data.clientName}
                placeholder='Votre nom'
              ></input>
            </div>
            <div className='form-group mb-3'>
              <label className='text-muted'>Adresse de livraison:</label>
              <textarea
                onChange={handleAddress}
                className='form-control'
                value={data.address}
                placeholder='Entrez votre adresse ici (adresse, ville, code postal...)'
              ></textarea>
            </div>
          </div>

          <DropIn
            options={{
              authorization: data.clientToken
            }}
            onInstance={instance => (data.instance = instance)}
          />
          <button className='btn btn-success btn-block' onClick={buy}>
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = error => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = success => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      Merci pour votre achat !
    </div>
  );

  return (
    <div>
      <h2 className='fontSnd'>Total: {getTotal()}€</h2>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showDropIn()}
    </div>
  );
};

export default Checkout;
