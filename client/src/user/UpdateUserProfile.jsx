import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import Footer from '../core/Footer';
import EnConstruction from './enconstruction.png';

const UpdateUserProfile = () => {
  return (
    <Layout title='Dashboard' className='container'>
      <div>
        <img
          style={{ maxHeight: '100%', maxWidth: '100%' }}
          src={EnConstruction}
          alt='Page en construction'
        />
      </div>
      <Footer />
    </Layout>
  );
};

export default UpdateUserProfile;
