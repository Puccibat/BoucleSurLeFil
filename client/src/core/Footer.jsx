import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <footer>
        <div className='container'>
          <hr />
          <div className='row mt-5 mb-5 ml-5'>
            <div className='col-sm-4'>
              <Link to='/mentionsLegales'>Mentions légales</Link>
            </div>
            <div className='col-sm-4'>
              <a
                className='icon mr-3'
                href='https://www.instagram.com/bouclesurlefil/'
                target='blank'
              >
                <i
                  className='fa fa-instagram'
                  aria-hidden='true'
                  style={{ fontSize: '48px' }}
                ></i>
              </a>
              <a
                className='icon ml-3'
                href='https://www.pinterest.fr/BoucleSurLeFil/'
                target='blank'
              >
                <i
                  className='fa fa-pinterest'
                  aria-hidden='true'
                  style={{ fontSize: '48px', color: 'red' }}
                ></i>
              </a>
            </div>
            <div className='col-sm-4'>
              <Link to='/conditionsGenerales'>
                Conditions générales de ventes
              </Link>
            </div>
          </div>
          <div className='mb-5'>Contact: contact@bouclesurlefil.com</div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
