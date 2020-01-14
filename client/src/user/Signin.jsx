import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuth } from '../auth/index';

const Signin = () => {
  const [values, setvalues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuth();

  const handleChange = name => event => {
    setvalues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setvalues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        setvalues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setvalues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  const signinForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          onChange={handleChange('email')}
          className='form-control'
          value={email}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Mot de passe</label>
        <input
          type='password'
          onChange={handleChange('password')}
          className='form-control'
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className='btn btn-primary'>
        Valider
      </button>
    </form>
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />;
      } else {
        return <Redirect to='/user/dashboard' />;
      }
    }
    if (isAuth()) {
      return <Redirect to='/' />;
    }
  };

  return (
    <Layout className='container col-md-8 offset-md-2'>
      {showLoading()}
      {showError()}
      {signinForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
