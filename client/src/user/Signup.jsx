import React, { useState } from 'react';
import Layout from '../core/Layout';

const Signup = () => {
  const [values, setvalues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    succes: false
  });

  const handleChange = name => event => {
    setvalues({ ...values, error: false, [name]: event.target.value });
  };

  const signupForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          onChange={handleChange('name')}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          onChange={handleChange('email')}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          onChange={handleChange('password')}
          className='form-control'
        />
      </div>
      <button className='btn btn-primary'>Submit</button>
    </form>
  );

  return (
    <Layout
      title='Signup Page'
      description='BoucleSurLeFil'
      className='container col-md-8 offset-md-2'
    >
      {signupForm()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;
