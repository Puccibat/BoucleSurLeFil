import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuth } from '../auth/index';
import Footer from '../core/Footer';

const UserDashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuth();

  const userLinks = () => {
    return (
      <div className='card mb-5'>
        <h4 className='card-header'></h4>
        <ul className='list-group fontSnd'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/cart'>
              Mon panier
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/profile/update'>
              Modifier mon profil
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Mes informations</h3>
        <ul className='list-group fontSnd'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>
            {role === 1 ? 'Administrateur' : 'Client'}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Historique de commandes</h3>
        <ul className='list-group'>
          <li className='list-group-item'>Mes commandes</li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='Dashboard'
      description={`Hey ${name} !`}
      className='container'
    >
      <div className='row'>
        <div className='col-sm-3'>{userLinks()}</div>
        <div className='col-sm-9'>
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default UserDashboard;
