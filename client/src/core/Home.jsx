import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts, getCategories, getProductsByCategory } from './apiCore';
import Card from './Card';
import CategoriesComponent from './Categories';
import Footer from './Footer';

const Home = () => {
  const [productsBySell, setPorductsBySell] = useState([]);
  const [productsByArrival, setPorductsByArrival] = useState([]);
  const [productsByCategory, setPorductsByCategory] = useState([]);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);

  const loadProductbyCategory = categoryId => {
    getProductsByCategory(categoryId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setPorductsByCategory(data);
      }
    });
  };

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

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
    loadCategories();
    loadProductbyCategory();
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title='Home Page'
      description='BoucleSurLeFil'
      className='container-fluid'
    >
      <div className='row justify-content-center'>
        <CategoriesComponent
          categories={categories}
          loadProductbyCategory={loadProductbyCategory}
        />
      </div>

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
