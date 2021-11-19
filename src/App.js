import './App.css';
import HomePage from './containers/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductListPage from './containers/ProductListPage/index';
import { useDispatch, useSelector } from 'react-redux';
import { gethomepage, isUserLoggedIn, updateCart } from './actions';
import { useEffect } from 'react';
import ProductDetailsPage from './containers/ProductDetailsPage/index';
import CartPage from './containers/CartPage/cart';
import CheckoutPage from './containers/CheckoutPage/index';
import OrderPage from './containers/OrderPage/index';
import OrderDetailsPage from "./containers/OrderDetailsPage";
// import OrderPage from "./containers/orderPage";

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(gethomepage());
  },[ ]);
  
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    console.log('App.js - updateCart');
    dispatch(updateCart());
    
  },[auth.authenticate]);
  


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/cart' component={CartPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          <Route path='/:productSlug/:productId/p' component={ProductDetailsPage} />
          <Route path='/:slug' component={ProductListPage} />
        </Switch>
      </Router>                                                                                                                         
    </div>
  );
}

export default App;
