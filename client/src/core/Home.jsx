import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';

const Home = () => {
  const [productsBySell, setPorductsBySell] = useState([]);
  const [productsByArrivel, setPorductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setPorductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setPorductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout title='Home Page' description='BoucleSurLeFil'>
      {JSON.stringify(productsByArrivel)}
      <br />
      {JSON.stringify(productsBySell)}
    </Layout>
  );
};

export default Home;
