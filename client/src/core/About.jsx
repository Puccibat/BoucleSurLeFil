import React from 'react';
import Layout from './Layout';
import Footer from './Footer';

const About = () => {
  return (
    <Layout
      title='About'
      description='BoucleSurLeFil'
      className='container-fluid'
    >
      <div>
        <h2>Alix Galabert</h2>
        <p>I'm a young creator of handmade jewels.</p>
      </div>
      <Footer />
    </Layout>
  );
};

export default About;
