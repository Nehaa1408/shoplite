import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8080/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (err) {
        console.error("Fetch orders error:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-purple-50/80 backdrop-blur-xl shadow-[0px_12px_32px_rgba(43,42,81,0.06)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-extrabold tracking-tight text-blue-700">
            ShopLite
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <span
              onClick={() => navigate("/")}
              className="text-slate-600 hover:text-blue-500 cursor-pointer"
            >
              Shop
            </span>
            <span className="text-blue-700 border-b-2 border-blue-600 pb-1">
              Orders
            </span>
            <span className="text-slate-600 hover:text-blue-500">Cart</span>
            <span className="text-slate-600 hover:text-blue-500">Wishlist</span>
          </div>

          <div className="flex items-center gap-4">
            <input
              className="pl-4 pr-4 py-2 bg-surface-container-highest/40 rounded-lg text-sm w-64"
              placeholder="Search orders..."
            />
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="pt-28 pb-24 px-4 bg-gradient-to-br from-purple-100 to-blue-200 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-extrabold mb-2">Order History</h1>
            <p className="text-gray-600 text-lg">
              Review and track your recent purchases.
            </p>
          </header>

          {/* Cards */}
          <div className="space-y-6">
            {orders.length === 0 && (
              <p className="text-center text-gray-500">No orders yet.</p>
            )}

            {orders.map((order, index) => {
              const items = order.items || [];

              const subtotal = items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );

              const tax = subtotal * 0.04;
              const total = subtotal + tax;

              return (
                <div key={index} className="bg-white/80 backdrop-blur-xl p-6 rounded-xl shadow-lg">

                  <div className="flex justify-between mb-6">
                    <div>
                      <p className="text-xs text-gray-500">Order ID</p>
                      <p className="font-bold">{order.orderId}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p>{new Date(order.orderDate).toLocaleString()}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-blue-600 font-bold">
                        ₹{total.toFixed(2)}
                      </p>
                    </div>

                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {order.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-t pt-4">
                    <div className="flex gap-3">
                      {items.slice(0, 2).map((item, i) => (
                        <img
                          key={i}
                          src={item.image}
                          className="w-20 h-20 rounded-lg"
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => navigate("/order-tracking", { state: order })}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      View Details
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};


export default OrderHistory;
