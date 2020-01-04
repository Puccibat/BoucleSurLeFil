import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, updateItem, removeItem } from './cartHelpers';
import Layout from './Layout';
import ShowImage from './ShowImage';
import Checkout from './Checkout';

const Cart = ({
  product,
  cartUpdate = true,
  showRemoveProductButton = true,
  setRun = f => f,
  run = undefined
}) => {
  const [items, setItems] = useState([]);
  // const [count, setCount] = useState(product.count);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        <div className='row'>
          <table class='table table-striped'>
            <thead>
              <tr>
                <th scope='col'>Product</th>
                <th scope='col'>Name</th>
                <th scope='col'>Price</th>
                <th scope='col'>Remove</th>
                <th scope='col'>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product, index) => (
                <tr key={index} cartUpdate={true} setRun={setRun} run={run}>
                  <th scope='row'>
                    <ShowImage item={product} url='product' />
                  </th>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{showRemoveButton(showRemoveProductButton)}</td>
                  {/* <td>{showCartUpdateOptions(cartUpdate)}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
          X
        </button>
      )
    );
  };

  // const handleChange = productId => event => {
  //   setRun(!run);
  //   setCount(event.target.value < 1 ? 1 : event.target.value);
  //   if (event.target.value >= 1) {
  //     updateItem(productId, event.target.value);
  //   }
  // };

  // const showCartUpdateOptions = cartUpdate => {
  //   return (
  //     cartUpdate && (
  //       <div>
  //         <div className='input-group mb-3'>
  //           <div className='input-group-prepend'>
  //             <span className='input-group-text'></span>
  //           </div>
  //           <input
  //             type='number'
  //             className='form-control'
  //             value={count}
  //             onChange={handleChange(product._id)}
  //           />
  //         </div>
  //       </div>
  //     )
  //   );
  // };

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
      <div className='container'>
        {items.length > 0 ? showItems(items) : noItemsMessage()}
        <h2 className='mb-4'>Your cart summary</h2>
        <hr />
        <Checkout products={items} />
      </div>
    </div>
  );
};

export default Cart;
