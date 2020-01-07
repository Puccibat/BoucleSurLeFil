import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuth } from '../auth/index';
import { listOrders } from '../admin/ApiAdmin';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    loadOrders();
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
                  <li className='list-group-item'>{order.status}</li>
                  <li className='list-group-item'>
                    Transaction ID: {order.transaction_id}
                  </li>
                  <li className='list-group-item'>Amount: {order.amount}€</li>
                  <li className='list-group-item'>
                    Ordered on: {moment(order.createdAt).fromNow()}
                  </li>
                  <li className='list-group-item'>
                    Delivery address: {order.address}
                  </li>
                </ul>

                <h3 className='mt-4 mb-4 font-italic'>
                  Total products in the order: {order.products.length}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
