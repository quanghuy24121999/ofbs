import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-pro-sidebar/dist/css/styles.css';
import { CartProvider } from "react-use-cart";

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
import errorPage from './screens/errorPage';

import { ProtectedRouteAdmin, ProtectedRouteCustomer, ProtectedRouteLogin, 
  ProtectedRouteCustomerRestaurant } from './common/checkAuthen';

class App extends Component {
  render() {
    return (
      <CartProvider>
        <Router>
          <div className="app">
            <Switch>
              <Route exact path="/" component={home} />
              <ProtectedRouteLogin exact path="/login" component={login} />
              <Route exact path="/register" component={register} />
              <Route exact path="/forget-password" component={forgetPassword} />
              <Route exact path="/search-result" component={searchResult} />
              <Route exact path="/promotion" component={promotion} />
              <Route exact path="/restaurant-detail/:restaurantId" component={restaurantDetail} />
              <Route exact path="/restaurant-detail/:restaurantId/menu" component={menu} />
              <Route exact path="/restaurant-detail/:restaurantId/combo" component={combo} />
              <Route exact path="/restaurant-detail/:restaurantId/service" component={service} />
              <Route exact path="/provider-register" component={registerProvider} />

              <ProtectedRouteCustomer exact path="/users/profile" component={userProfile} />
              <ProtectedRouteCustomer exact path="/users/profile/order" component={orderCustomer} />
              <ProtectedRouteCustomer exact path="/users/profile/orderDetail/:orderId" component={orderDetailCustomer} />
              <ProtectedRouteCustomer exact path="/users/profile/my-restaurant" component={myRestaurant} />
              <ProtectedRouteCustomerRestaurant exact path="/users/profile/my-restaurant/detail" component={myRestaurantDetail} />
              <ProtectedRouteCustomer exact path="/users/profile/my-restaurant/menu" component={myRestaurantMenu} />
              <ProtectedRouteCustomer exact path="/users/profile/my-restaurant/combo" component={myRestaurantCombo} />
              <ProtectedRouteCustomer exact path="/users/profile/my-restaurant/image" component={myRestaurantImage} />
              <ProtectedRouteCustomer exact path="/users/profile/my-restaurant/service" component={myRestaurantService} />
              <ProtectedRouteCustomer exact path="/users/profile/my-restaurant/promotion" component={myRestaurantPromotion} />
              <ProtectedRouteCustomer exact path="/users/profile/my-restaurant/order" component={myRestaurantOrder} />

              <ProtectedRouteAdmin exact path="/admin" component={admin} />
              <ProtectedRouteAdmin exact path="/admin/order" component={order} />
              <ProtectedRouteAdmin exact path="/admin/restaurant" component={restaurant} />
              <ProtectedRouteAdmin exact path="/admin/restaurant/detail" component={adminRestaurantDetail} />
              <ProtectedRouteAdmin exact path="/admin/restaurant/image" component={adminRestaurantImage} />
              <ProtectedRouteAdmin exact path="/admin/restaurant/menu" component={adminRestaurantMenu} />
              <ProtectedRouteAdmin exact path="/admin/restaurant/combo" component={adminRestaurantCombo} />
              <ProtectedRouteAdmin exact path="/admin/restaurant/service" component={adminRestaurantService} />

              <Route path="*" component={errorPage} />
            </Switch>
          </div>
        </Router>
      </CartProvider>
    );
  }
}

export default App;
