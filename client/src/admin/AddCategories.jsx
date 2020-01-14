import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuth } from '../auth/index';
import { createCategory } from '../admin/ApiAdmin';

const AddCategories = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuth();

  const handleChange = e => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(true);
      } else {
        setError('');
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Nom de votre catégorie</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className='btn btn-outline-primary'>Créer une catégorie</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className='text-success'>{name} a été créer</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className='text-danger'>{name} existe déjà</h3>;
    }
  };

  const goBack = () => (
    <div className='mt-5'>
      <Link to='/admin/dashboard' className='text-warning'>
        Retour au Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title='Add a new category'
      description={`Hey ${user.name} !, please add a new category`}
      className='container'
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategories;
