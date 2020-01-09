import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuth } from '../auth/index';
import { itemTotal } from './cartHelpers';

const Menu = ({ history }) => {
  return (
    <div className='container'>
      <div className=' navbar navbar-expand-lg'>
        <ul
          className='navbar-nav heading'
          style={{ fontSize: '20px', margin: 'auto' }}
        >
          <li className='nav-item '>
            <Link className='nav-link  menu' to='/'>
              Accueil
            </Link>
          </li>
          <li className='nav-item '>
            <Link className='nav-link  menu' to='/bijoux'>
              Bijoux
            </Link>
          </li>
          <li className='nav-item '>
            <Link className='nav-link  menu' to='/about'>
              A propos
            </Link>
          </li>

          {isAuth() && isAuth().user.role === 0 && (
            <li className='nav-item '>
              <Link className='nav-link  menu' to='/user/dashboard'>
                Mon profil
              </Link>
            </li>
          )}

          {isAuth() && isAuth().user.role === 1 && (
            <li className='nav-item '>
              <Link className='nav-link menu' to='/admin/dashboard'>
                Dashboard
              </Link>
            </li>
          )}

          {!isAuth() && (
            <Fragment>
              <li className='nav-item '>
                <Link className='nav-link menu' to='/signin'>
                  Connexion
                </Link>
              </li>
              <li className='nav-item '>
                <Link className='nav-link menu' to='/signup'>
                  Inscription
                </Link>
              </li>
            </Fragment>
          )}

          {isAuth() && (
            <li className='nav-item '>
              <a
                className='nav-link menu'
                href='#'
                onClick={() =>
                  signout(() => {
                    history.push('/');
                  })
                }
              >
                Déconnexion
              </a>
            </li>
          )}

          <li className='nav-item '>
            <Link className='nav-link menu' to='/cart'>
              Panier
              {itemTotal() > 0 ? (
                <sup>
                  <small className='cart-badge' style={{ color: '#ffffff' }}>
                    {itemTotal()}
                  </small>
                </sup>
              ) : null}
            </Link>
          </li>
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default withRouter(Menu);
