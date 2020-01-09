import React, { useState, useEffect } from 'react';

const Categories = ({
  categories,
  loadProductbyCategory,
  loadProductsByArrival
}) => {
  return (
    <div>
      <div className='navbar navbar-expand-lg'>
        <ul className='navbar-nav heading' style={{ fontSize: '20px' }}>
          {categories.map((category, index) => (
            <li key={index} className='nav-item active' category={category}>
              <a
                className='nav-link menuC'
                value={category._id}
                onClick={() => loadProductbyCategory(category._id)}
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default Categories;
