import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import '../style.css';

const Layout = ({
  title = 'Title',
  description = 'Description',
  children,
  className
}) => {
  return (
    <div>
      <Menu />
      <div className='container text-center mt-5'>
        <h1 className='title'>
          <Link className='nav-link' style={{ color: '#951616' }} to='/'>
            Boucle Sur Le Fil
          </Link>
        </h1>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
