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
        <h1 className='text display-2'>Total des commandes: {orders.length}</h1>
      );
    } else {
      return <h1 className='text-danger'>Pas de commande</h1>;
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
      <h3 className='mark mb-4'>Statut: {order.status}</h3>
      <select
        className='form-control'
        onChange={event => handleStatusChange(event, order._id)}
      >
        <option>Mettre à jour le statut</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout className='container'>
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
                  <span>Commande ID: {order._id}</span>
                </h2>
                <ul className='list-group mb-2'>
                  <li className='list-group-item'>{showStatus(order)}</li>
                  <li className='list-group-item'>
                    Transaction ID: {order.transaction_id}
                  </li>
                  <li className='list-group-item'>Montant: {order.amount}€</li>
                  <li className='list-group-item'>
                    Commandé le: {moment(order.createdAt).fromNow()}
                  </li>
                  <li className='list-group-item'>
                    Nom de livraison: {order.clientName}
                  </li>
                  <li className='list-group-item'>
                    Adresse de livraison: {order.address}
                  </li>
                </ul>

                <h3 className='mt-4 mb-4 font-italic'>
                  Nombre de produit dans la commande: {order.products.length}
                </h3>
                {order.products.map((product, productIndex) => (
                  <div
                    className='mb-4'
                    key={productIndex}
                    style={{ padding: '20px', border: '1px solid red' }}
                  >
                    {showInput('Nom du produit', product.name)}
                    {showInput('Prix', product.price)}
                    {showInput('Nombre de produit', product.count)}
                    {showInput('Produit ID', product._id)}
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
