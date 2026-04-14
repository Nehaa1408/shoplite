import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import ProductDetails from "./pages/user/ProductDetails";
import Cart from "./pages/user/Cart";
import Categories from "./pages/user/Categories";
import Brands from "./pages/user/Brands";
import TopDeals from "./pages/user/TopDeals";


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login"element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/brands" element={<Brands/>} />
        <Route path="/top-deals" element={<TopDeals/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
