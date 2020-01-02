import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuth } from '../auth/index';
import { itemTotal } from './cartHelpers';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#000000' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className='nav nav-tabs bg-danger'>
        <li className='nav-item'>
          <Link className='nav-link' style={isActive(history, '/')} to='/'>
            Home
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(history, '/shop')}
            to='/shop'
          >
            Shop
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(history, '/about')}
            to='/about'
          >
            About
          </Link>
        </li>

        {isAuth() && isAuth().user.role === 0 && (
          <li className='nav-item'>
            <Link
              className='nav-link'
              style={isActive(history, '/user/dashboard')}
              to='/user/dashboard'
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuth() && isAuth().user.role === 1 && (
          <li className='nav-item'>
            <Link
              className='nav-link'
              style={isActive(history, '/admin/dashboard')}
              to='/admin/dashboard'
            >
              Dashboard
            </Link>
          </li>
        )}

        {!isAuth() && (
          <Fragment>
            <li className='nav-item'>
              <Link
                className='nav-link'
                style={isActive(history, '/signin')}
                to='/signin'
              >
                Signin
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                style={isActive(history, '/signup')}
                to='/signup'
              >
                Signup
              </Link>
            </li>
          </Fragment>
        )}

        {isAuth() && (
          <li className='nav-item'>
            <span
              className='nav-link'
              style={{ cursor: 'pointer', color: '#ffffff' }}
              onClick={() =>
                signout(() => {
                  history.push('/');
                })
              }
            >
              Signout
            </span>
          </li>
        )}

        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(history, '/cart')}
            to='/cart'
          >
            Cart{''}
            <sup>
              <small className='cart-badge'>{itemTotal()}</small>
            </sup>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
