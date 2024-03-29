import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuth } from '../auth/index';
import Footer from '../core/Footer';

const AdminDashboard = () => {
  const {
    user: { name, email, role }
  } = isAuth();

  const adminLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>Admin</h4>
        <ul className='list-group fontSnd'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/create/category'>
              Créer une catégorie
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/create/product'>
              Créer un produit
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/orders'>
              Voir les commandes
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/products'>
              Gérer les produits
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Mes informations</h3>
        <ul className='list-group fontSnd'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>
            {role === 1 ? 'Admin' : 'Registered user'}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout className='container'>
      <div className='row'>
        <div className='col-sm-3 mb-5'>{adminLinks()}</div>
        <div className='col-sm-9'>{adminInfo()}</div>
      </div>
      <Footer />
    </Layout>
  );
};

export default AdminDashboard;
