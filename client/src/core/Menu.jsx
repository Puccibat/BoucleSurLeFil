import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuth } from '../auth/index';
import { itemTotal } from './cartHelpers';

// const isActive = (history, path) => {
//   if (history.location.pathname === path) {
//     return { color: '#000000' };
//   } else {
//     return { color: '#ffffff' };
//   }
// };

const Menu = ({ history }) => {
  return (
    <div className='container'>
      <div className='row justify-content-center navbar navbar-expand-lg'>
        <ul className='navbar-nav heading' style={{ fontSize: '25px' }}>
          <li className='nav-item col-2'>
            <Link className='nav-link  menu' to='/'>
              Home
            </Link>
          </li>
          <li className='nav-item col-2'>
            <Link className='nav-link  menu' to='/about'>
              About
            </Link>
          </li>

          {isAuth() && isAuth().user.role === 0 && (
            <li className='nav-item col-3'>
              <Link className='nav-link  menu' to='/user/dashboard'>
                Dashboard
              </Link>
            </li>
          )}

          {isAuth() && isAuth().user.role === 1 && (
            <li className='nav-item col-3'>
              <Link className='nav-link menu' to='/admin/dashboard'>
                Dashboard
              </Link>
            </li>
          )}

          {!isAuth() && (
            <Fragment>
              <li className='nav-item col-2'>
                <Link className='nav-link menu' to='/signin'>
                  Signin
                </Link>
              </li>
              <li className='nav-item col-2'>
                <Link className='nav-link menu' to='/signup'>
                  Signup
                </Link>
              </li>
            </Fragment>
          )}

          {isAuth() && (
            <li className='nav-item col-2'>
              <a
                className='nav-link menu'
                href='#'
                onClick={() =>
                  signout(() => {
                    history.push('/');
                  })
                }
              >
                Signout
              </a>
            </li>
          )}

          <li className='nav-item col-2'>
            <Link className='nav-link menu ml-4' to='/cart'>
              Cart
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
