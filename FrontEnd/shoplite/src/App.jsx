import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/user/Home";
import UserLogin from "./pages/user/UserLogin";
import UserSignup from "./pages/user/UserSignup";
import ProductDetails from "./pages/user/ProductDetails";
import Cart from "./pages/user/Cart";
import Categories from "./pages/user/Categories";
import Brands from "./pages/user/Brands";
import TopDeals from "./pages/user/TopDeals";
import Checkout from "./pages/user/Checkout";
import OrderConfirmation from "./pages/user/OrderConfirmation";
import OrderTracking from "./pages/user/OrderTracking";
import OrderHistory from "./pages/user/OrderHistory";
import Profile from "./pages/user/Profile";
import TicketManagement from "./pages/user/TicketManagement";

import AdminRoute from "./pages/admin/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import AddProduct from "./pages/admin/AddProduct";
import ManageOrders from "./pages/admin/ManageOrders";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminTicketDetails from "./pages/admin/AdminTicketDetails";

function App() {
  return (
    <BrowserRouter>


      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        {/* USER */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/top-deals" element={<TopDeals />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderConfirmation />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/tickets" element={<TicketManagement />} />

        {/* ADMIN */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ManageProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/tickets"
          element={
            <AdminRoute>
              <AdminTickets />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/ticket/:id"
          element={
            <AdminRoute>
              <AdminTicketDetails />
            </AdminRoute>
          }
        />

        <Route
          path="/manage-orders"
          element={
            <AdminRoute>
              <ManageOrders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <AdminRoute>
              <ManageOrders />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;