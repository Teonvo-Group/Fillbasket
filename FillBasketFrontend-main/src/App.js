import React from "react";
import Home from './components/Home.js';
import Signup from './components/signup.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './components/Shop.js';
import Shopd from './components/shopd.js';
import Signupp from './components/signupp.js';
import Cart from './components/cart.js';
import Contact from './components/contact.js';
import Background from "./components/background.js";
import Shopr from "./components/shopreg.js";
import Admin from "./components/adminreg.js";
import Sellerpan from "./components/sellerpan.js";
import Shop_AdminDashboard from "./components/Shop_AdminDashboard.js";
import RequiredAdmin from "./helpers/isAdmin.js";
import Shopdetail from "./components/Shopdetail.js";
import ShopSpecificDetail from "./components/ShopSpecificDetail.js";



function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");


  return (
    <>
      <Router>
        <Background />
        <Routes>

          <Route path='/Home' element={<Home />} />
          <Route exact path='/' element={isLoggedIn === "true" ? <Home /> : <Signup />} />
          {/* <Route path='/Shop' element={

            <RequiredAdmin>
              <Shop /></RequiredAdmin>} /> */}
          <Route path='/Shop' element={<Shop />} />    
          <Route path='/Shopd' element={<Shopdetail />} />
          <Route path='/Signupp' element={<Signupp />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/shopr' element={<Shopr />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/sell' element={<Sellerpan />} />
          <Route path='/specificShopDetail/:shopId' element={<ShopSpecificDetail />} />
          <Route path='/shop_admin_dashboard' element={
            <RequiredAdmin><Shop_AdminDashboard /></RequiredAdmin>
          } />



        </Routes>
      </Router>
    </>
  );
}

export default App;
