import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/OurStore';
import Blog from './pages/Blog';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forgotpassword from './pages/Forgotpassword';
import Resetpassword from './pages/Resetpassword';
import SingleProduct from './pages/SingleProduct';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPloicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermAndContions from './pages/TermAndConditions';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { PrivateRoute } from './routes/PrivateRoute';
import { OpenRoute } from './routes/OpenRoute';
import Order from './pages/Order';
import Profile from './pages/Profile';
function App() {
  return (
<>
<Provider store={store}>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Layout/>}>
  <Route index element={<Home/>} />
  <Route path="about" element={<About/>}/>
  <Route path="contact" element={<Contact/>}/>
  <Route path="product" element={<OurStore />} />
  <Route path="product/:id" element={<SingleProduct />} />
  <Route path="cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
  <Route path="order" element={<PrivateRoute><Order/></PrivateRoute>} />
  <Route path="checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
  <Route path="blogs" element={<Blog />} />
  <Route path="blog/:id" element={<SingleBlog />} />
  <Route path="compareproduct" element={<CompareProduct />} />
  <Route path="wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
  <Route path="login" element={<OpenRoute><Login /></OpenRoute>} />
  <Route path="signup" element={<OpenRoute><Signup /></OpenRoute>} />
  <Route path="my-profile" element={<Profile/>} />
  <Route path="forgot-password" element={<Forgotpassword />} />
  <Route path="reset-password/:token" element={<Resetpassword />} />
  <Route path="privacy-policy" element={<PrivacyPolicy />} />
  <Route path="refund-policy" element={<RefundPloicy />} />
  <Route path="shipping-policy" element={<ShippingPolicy />} />
  <Route path="term-conditions" element={<TermAndContions />} />
  </Route>
</Routes>
</BrowserRouter>
</Provider>
</>
  );
}

export default App;
