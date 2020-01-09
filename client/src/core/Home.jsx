import React, { useState, useEffect, Fragment } from 'react';
import Layout from './Layout';
import { getProducts, getCategories, getProductsByCategory } from './apiCore';
import Card from './Card';
import CategoriesComponent from './Categories';
import Footer from './Footer';
import Spinner from './Spinner';

const Home = () => {
  const [productsBySell, setPorductsBySell] = useState([]);
  const [productsByArrival, setPorductsByArrival] = useState([]);
  const [productsByCategory, setPorductsByCategory] = useState([]);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <Layout
      title='Home Page'
      description='BoucleSurLeFil'
      className='container-fluid'
    >
      <h2 className='mb-4 titleHome'>New arrivals</h2>
      <div className='row'>
        {productsByArrival.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>

      <h2 className='mb-4 mt-5 titleHome'>Best sellers</h2>
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
