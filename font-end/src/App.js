import { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-pro-sidebar/dist/css/styles.css';

import './App.css';
import './admin.scss';

import home from "./screens/home";
import login from "./screens/login";
import register from "./screens/register";
import forgetPassword from "./screens/forget-password";
import searchResult from "./screens/searchResult";
import restaurantDetail from './screens/restaurantDetail';
import menu from './screens/menu';
import combo from './screens/combo';
import service from './screens/service';
import userProfile from './screens/userProfile';
import orderCustomer from './screens/orderCustomer';
import myRestaurant from './screens/myRestaurant';
import myRestaurantDetail from './screens/myRestaurantDetail';
import myRestaurantMenu from './screens/myRestaurantMenu';
import myRestaurantCombo from './screens/myRestaurantCombo';
import myRestaurantImage from './screens/myRestaurantImage';
import myRestaurantService from './screens/myRestaurantService';
import myRestaurantPromotion from './screens/myRestaurantPromotion';
import myRestaurantOrder from './screens/myRestaurantOrder';
import orderDetailCustomer from './screens/orderCustomerDetail';
import promotion from './screens/promotion';
import registerProvider from './screens/registerProvider';

import admin from './screens/admin/dashboard';
import order from './screens/admin/order';
import restaurant from './screens/admin/restaurant';
import adminRestaurantDetail from './screens/admin/restaurantDetail';
import adminRestaurantImage from './screens/admin/restaurantImage';
import adminRestaurantMenu from './screens/admin/restaurantDish';
import adminRestaurantCombo from './screens/admin/restaurantCombo';
import adminRestaurantService from './screens/admin/restaurantService';

import { CartProvider } from "react-use-cart";
import { ProtectedRoute } from './common/checkAuthen';

class App extends Component {
  render() {
    return (
      <CartProvider>
        <Router>
          <div className="app">
            <Route path="/" exact component={home} />
            <Route path="/login" component={login} />
            <Route path="/register" component={register} />
            <Route path="/forget-password" component={forgetPassword} />
            <Route path="/search-result" component={searchResult} />
            <Route exact path="/restaurant-detail/:restaurantId" component={restaurantDetail} />
            <Route exact path="/restaurant-detail/:restaurantId/menu" component={menu} />
            <Route exact path="/restaurant-detail/:restaurantId/combo" component={combo} />
            <Route exact path="/restaurant-detail/:restaurantId/service" component={service} />
            <Route exact path="/users/profile/:userId" component={userProfile} />
            <Route exact path="/users/profile/:userId/order" component={orderCustomer} />
            <Route exact path="/users/profile/:userId/my-restaurant" component={myRestaurant} />
            <Route exact path="/users/profile/:userId/my-restaurant/:restaurantId/detail" component={myRestaurantDetail} />
            <Route exact path="/users/profile/:userId/my-restaurant/:restaurantId/menu" component={myRestaurantMenu} />
            <Route exact path="/users/profile/:userId/my-restaurant/:restaurantId/combo" component={myRestaurantCombo} />
            <Route exact path="/users/profile/:userId/my-restaurant/:restaurantId/image" component={myRestaurantImage} />
            <Route exact path="/users/profile/:userId/my-restaurant/:restaurantId/service" component={myRestaurantService} />
            <Route exact path="/users/profile/:userId/my-restaurant/:restaurantId/promotion" component={myRestaurantPromotion} />
            <Route exact path="/users/profile/:userId/my-restaurant/:restaurantId/order" component={myRestaurantOrder} />
            <Route exact path="/users/profile/:userId/orderDetail/:orderId" component={orderDetailCustomer} />
            <Route exact path="/promotion" component={promotion} />
            <Route exact path="/provider-register" component={registerProvider} />

            <ProtectedRoute exact path="/admin" component={admin} />
            <ProtectedRoute exact path="/admin/order" component={order} />
            <ProtectedRoute exact path="/admin/restaurant" component={restaurant} />
            <ProtectedRoute exact path="/admin/restaurant/detail" component={adminRestaurantDetail} />
            <ProtectedRoute exact path="/admin/restaurant/image" component={adminRestaurantImage} />
            <ProtectedRoute exact path="/admin/restaurant/menu" component={adminRestaurantMenu} />
            <ProtectedRoute exact path="/admin/restaurant/combo" component={adminRestaurantCombo} />
            <ProtectedRoute exact path="/admin/restaurant/service" component={adminRestaurantService} />
          </div>
        </Router>
      </CartProvider>
    );
  }
}

export default App;
