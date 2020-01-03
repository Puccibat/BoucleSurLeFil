import React from 'react';

const Categories = () => {
  return (
    <div>
      <div className='navbar navbar-expand-lg'>
        <ul className='navbar-nav'>
          <li className='nav-item active'>
            <a className='nav-link' href='#'>
              Colliers
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Boucles d'oreilles
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Bracelets
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Sautoirs
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Bagues
            </a>
          </li>
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default Categories;
