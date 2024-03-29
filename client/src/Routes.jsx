import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import About from './core/About';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategories from './admin/AddCategories';
import AddProduct from './admin/AddProduct';
import Product from './core/Product';
import Mentions from './core/Mentions';
import Cgv from './core/Cgv';
import Bijoux from './core/Bijoux';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateUserProfile from './user/UpdateUserProfile';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/bijoux' exact component={Bijoux} />
        <Route path='/product/:productId' exact component={Product} />
        <Route path='/about' exact component={About} />
        <Route path='/mentionsLegales' exact component={Mentions} />
        <Route path='/conditionsGenerales' exact component={Cgv} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/signin' exact component={Signin} />
        <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
        <PrivateRoute
          path='/profile/update'
          exact
          component={UpdateUserProfile}
        />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
        <AdminRoute path='/create/category' exact component={AddCategories} />
        <AdminRoute path='/create/product' exact component={AddProduct} />
        <AdminRoute path='/admin/orders' exact component={Orders} />
        <AdminRoute path='/admin/products' exact component={ManageProducts} />
        <AdminRoute
          path='/admin/product/update/:productId'
          exact
          component={UpdateProduct}
        />
        <Route path='/cart' exact component={Cart} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
