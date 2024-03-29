import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Footer from './Footer';

const Home = () => {
  const [productsBySell, setPorductsBySell] = useState([]);
  const [productsByArrival, setPorductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold', 8).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setPorductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt', 8).then(data => {
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
    <Layout className='container-fluid'>
      <h2 className='mb-4 titleHome'>Nouveautés</h2>
      <div className='row'>
        {productsByArrival.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>

      <h2 className='mb-4 mt-5 titleHome'>Meilleurs ventes</h2>
      <div className='row'>
        {productsBySell.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
      <Footer />
    </Layout>
  );
};

export default Home;
