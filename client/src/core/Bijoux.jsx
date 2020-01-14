import React, { useState, useEffect, Fragment } from 'react';
import Layout from './Layout';
import { getProducts, getCategories, getProductsByCategory } from './apiCore';
import Card from './Card';
import CategoriesComponent from './Categories';
import Footer from './Footer';
import Spinner from './Spinner';

const Home = () => {
  const [productsByArrival, setPorductsByArrival] = useState([]);
  const [productsByCategory, setPorductsByCategory] = useState([]);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProductbyCategory = categoryId => {
    setLoading(true);
    getProductsByCategory(categoryId).then(data => {
      if (data.error) {
        console.log(data.error);
        setError(data.error);
        setLoading(false);
      } else {
        console.log(data);
        setPorductsByCategory(data);
        setLoading(false);
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

  const loadProductsByArrival = () => {
    getProducts('createdAt', undefined).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setPorductsByArrival(data);
      }
    });
  };

  const renderProducts = () => {
    if (productsByCategory.length === 0) {
      return (
        <Fragment>
          <h2 className='mb-4 titleHome'>Tous nos bijoux</h2>
          <div className='row'>
            {productsByArrival.map((product, index) => (
              <Card key={index} product={product} />
            ))}
          </div>
        </Fragment>
      );
    } else {
      return (
        <div className='row'>
          {productsByCategory.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      );
    }
  };
  useEffect(() => {
    loadCategories();
    loadProductbyCategory();
    loadProductsByArrival();
  }, []);

  return (
    <Layout className='container-fluid'>
      <div className='row justify-content-center'>
        <CategoriesComponent
          categories={categories}
          loadProductbyCategory={loadProductbyCategory}
        />
      </div>
      {loading ? <Spinner /> : renderProducts()}
      <Footer />
    </Layout>
  );
};

export default Home;
