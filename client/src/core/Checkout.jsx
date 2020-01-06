import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import StripeButton from './StripeButton';

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  return (
    <div>
      <h2>Total: {getTotal()}€</h2>
      <StripeButton price={getTotal()} />
    </div>
  );
};

export default Checkout;
