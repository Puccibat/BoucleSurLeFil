import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuth } from '../auth/index';
import {
  listOrders,
  getStatusValues,
  updateOrderStatus
} from '../admin/ApiAdmin';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuth();

  const loadOrders = () => {
    listOrders(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className='text-danger display-2'>Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className='text-danger'>No orders</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className='input-group mb-2 mr-sm-2'>
      <div className='input-group-prepend'>
        <div className='input-group-text'>{key}</div>
      </div>
      <input type='text' value={value} className='form-control' readOnly />
    </div>
  );

  const handleStatusChange = (event, orderId) => {
    updateOrderStatus(user._id, token, orderId, event.target.value).then(
      data => {
        if (data.error) {
          console.log('status update failed');
        } else {
          loadOrders();
        }
      }
    );
  };

  const showStatus = order => (
    <div className='form-group'>
      <h3 className='mark mb-4'>Status: {order.status}</h3>
      <select
        className='form-control'
        onChange={event => handleStatusChange(event, order._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      title='Orders'
      description={`Hey !, you can manage your orders here !`}
      className='container'
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showOrdersLength(orders)}

          {orders.map((order, index) => {
            return (
              <div
                className='mt-5'
                key={index}
                style={{ borderBottom: '5px solid red' }}
              >
                <h2 className='mb-5'>
                  <span className='bg-primary'>Order ID: {order._id}</span>
                </h2>
                <ul className='list-group mb-2'>
                  <li className='list-group-item'>{showStatus(order)}</li>
                  <li className='list-group-item'>
                    Transaction ID: {order.transaction_id}
                  </li>
                  <li className='list-group-item'>Amount: {order.amount}€</li>
                  <li className='list-group-item'>
                    Ordered on: {moment(order.createdAt).fromNow()}
                  </li>
                  <li className='list-group-item'>
                    Nom de livraison: {order.clientName}
                  </li>
                  <li className='list-group-item'>
                    Delivery address: {order.address}
                  </li>
                </ul>

                <h3 className='mt-4 mb-4 font-italic'>
                  Total products in the order: {order.products.length}
                </h3>
                {order.products.map((product, productIndex) => (
                  <div
                    className='mb-4'
                    key={productIndex}
                    style={{ padding: '20px', border: '1px solid red' }}
                  >
                    {showInput('Product name', product.name)}
                    {showInput('Product price', product.price)}
                    {showInput('Product total', product.count)}
                    {showInput('Product ID', product._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
