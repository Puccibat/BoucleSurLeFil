import React from 'react';
import { API } from '../config';

const ShowImage = ({ item, url }) => (
  <div className='product-img'>
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className='mb-3'
      style={{ maxHeight: '30vh', maxWidth: '30wh' }}
    />
  </div>
);

export default ShowImage;
