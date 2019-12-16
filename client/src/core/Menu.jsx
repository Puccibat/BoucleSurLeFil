import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuth } from '../auth/index';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#951616' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className='nav nav-tabs bg-primary'>
        <li className='nav-item'>
          <Link className='nav-link' style={isActive(history, '/')} to='/'>
            Home
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(history, '/dashboard')}
            to='/dashboard'
          >
            Dashboard
          </Link>
        </li>

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
      </ul>
    </div>
  );
};

export default withRouter(Menu);
