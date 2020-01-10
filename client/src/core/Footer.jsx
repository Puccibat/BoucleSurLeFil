import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <footer>
        <div className='container'>
          <hr />
          <div className='d-flex justify-content-around'>
            <div>
              <Link to='/mentionsLegales'>Mentions légales</Link>
            </div>
            <div>
              <a
                className='icon mr-2'
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
                className='icon'
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
            <div>
              <Link to='/conditionsGenerales'>
                Conditions générales de ventes
              </Link>
            </div>
          </div>

          <div className='mb-5 mt-3 d-flex justify-content-around'>
            <div>contact@bouclesurlefil.com</div>
            <br />
            <div>Site créé par Puccibat</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
