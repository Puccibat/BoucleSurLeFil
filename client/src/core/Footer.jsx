import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className='is-primary'>
        <div className='container'>
          <div className='row mt-5 mb-5'>
            <div className='col-4'>
              <a href='#'>Mentions légales</a>
            </div>
            <div className='col-4'>
              <a className='icon mr-3' href='#'>
                <i
                  className='fa fa-instagram'
                  aria-hidden='true'
                  style={{ fontSize: '48px' }}
                ></i>
              </a>
              <a className='icon ml-3' href='#'>
                <i
                  className='fa fa-pinterest'
                  aria-hidden='true'
                  style={{ fontSize: '48px', color: 'red' }}
                ></i>
              </a>
            </div>
            <div className='col-4'>
              <a href='#'>Conditions générales de ventes</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
