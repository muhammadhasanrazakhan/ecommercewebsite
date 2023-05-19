import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);


// Get cart items and shipping info from local storage based on isAuthenticated value


if (!isAuthenticated) {
  localStorage.setItem("cartItems", JSON.stringify([]));
  localStorage.setItem("shippingInfo", JSON.stringify({}));
}


  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <BrowserRouter>
    <Header />
    {isAuthenticated && <UserOptions user={user} /> }
    <Routes>
    
    {stripeApiKey && (
    <Route path="/process/payment" element={
    <React.Fragment>
    <Elements stripe={loadStripe(stripeApiKey)}>
      <ProtectedRoute component={Payment} />
    </Elements>
    </React.Fragment>
    }/>
    )}

      {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Route exact path="/process/payment" element={<ProtectedRoute component={Payment} />} />
        </Elements>
      )} */}

      
        <Route exact path="/" element={<Home />} />

       <Route exact path="/product/:id" element={<ProductDetails />} />
       {/* <Route path="/product/:id" render={(props) => <ProductDetails {...props} />} /> */}
       {/* <Route exact path="/product/:id" component={ProductDetails} /> */}
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        <Route exact path="/search" element={<Search />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />

        {/* <Route exact path="/contact" component={Contact} /> */}

        {/* <Route exact path="/about" component={About} /> */}

        {/* <Route path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
        {/* <Route path="/account" render={() => (<ProtectedRoute isAdmin={true} element={<Profile />} />)} /> */}
        <Route path="/account" element={<ProtectedRoute component={Profile} />} />
        <Route path="/me/update" element={<ProtectedRoute component={UpdateProfile} />} />
        <Route path="/password/update" element={<ProtectedRoute component={UpdatePassword} />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />

        <Route exact path="/login" element={<LoginSignUp />} />

        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<ProtectedRoute component={Shipping} />} />
        <Route exact path="/success" element={<ProtectedRoute component={OrderSuccess} />} />
        <Route exact path="/orders" element={<ProtectedRoute component={MyOrders} />} />
        

        <Route exact path="/order/confirm" element={<ProtectedRoute component={ConfirmOrder} />} />
        <Route exact path="/order/:id" element={<ProtectedRoute component={OrderDetails} />} />
        <Route exact  path="/admin/dashboard" element={<ProtectedRoute  isAdmin={true} component={Dashboard} />} />
        <Route exact  path="/admin/products" element={<ProtectedRoute  isAdmin={true} component={ProductList} />} />
        <Route exact  path="/admin/product" element={<ProtectedRoute  isAdmin={true} component={NewProduct} />} />
        <Route exact  path="/admin/product/:id" element={<ProtectedRoute  isAdmin={true} component={UpdateProduct} />} />
        <Route exact  path="/admin/orders" element={<ProtectedRoute  isAdmin={true} component={OrderList} />} />
        <Route exact  path="/admin/order/:id" element={<ProtectedRoute  isAdmin={true} component={ProcessOrder} />} />
        <Route exact  path="/admin/users" element={<ProtectedRoute  isAdmin={true} component={UsersList} />} />
        <Route exact  path="/admin/user/:id" element={<ProtectedRoute  isAdmin={true} component={UpdateUser} />} />
        <Route exact  path="/admin/reviews" element={<ProtectedRoute  isAdmin={true} component={ProductReviews} />} />
        <Route exact path="" element={window.location.pathname === "/process/payment" ? null : <NotFound />}/>
        
        {/*<ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />
        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />

        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />

        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />

        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />

        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />*/}
       
        
      </Routes> 
      <Footer />
    </BrowserRouter>
  )
};

export default App;