import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_TZ0ioxM8zquxg0nq4RTgDfzN00ND0koU1m';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful ');
  };

  return (
    <StripeCheckout
      currency='EUR'
      name='BoucleSurLeFil'
      label='Pay Now'
      panelLabel='Pay'
      billingAddress
      shippingAddress
      description={`Your total is ${price}€`}
      amount={priceForStripe}
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;
