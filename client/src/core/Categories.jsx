import React from 'react';

const Categories = () => {
  return (
    <div>
      <div className='navbar navbar-expand-lg'>
        <ul className='navbar-nav heading' style={{ fontSize: '20px' }}>
          <li className='nav-item active'>
            <a className='nav-link menuC' href='#'>
              Colliers
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link menuC' href='#'>
              Boucles d'oreilles
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link menuC' href='#'>
              Bracelets
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link menuC' href='#'>
              Sautoirs
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link menuC' href='#'>
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
