import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import {
  getProducts,
  getBraintreeClientToken,
  processPayment
} from './apiCore';
import DropIn from 'braintree-web-drop-in-react';
import { token } from 'morgan';

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
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

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

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
            // console.log(response)
            setData({ ...data, success: response.success });
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        // console.log('dropin error: ', error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
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
      Thank you for your purchase !
    </div>
  );

  return (
    <div>
      <h2>Total: {getTotal()}€</h2>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showDropIn()}
    </div>
  );
};

export default Checkout;
