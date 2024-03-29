import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import '../style.css';

const Layout = ({ children, className }) => {
  return (
    <div>
      <div>
        <Menu />
      </div>
      <div className='container text-center mt-5'>
        <h1 className='title'>
          <Link className='nav-link' style={{ color: '#951616' }} to='/'>
            Boucle Sur Le Fil
          </Link>
        </h1>
        <hr className='mt-5' />
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
