import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import axios from "axios";

const TopDeals = () => {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [deals, setDeals] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showLoginPopup, setShowLoginPopup] = React.useState(false);

  const handleAddToCart = (item) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    addToCart(item);
  };

  React.useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/products?page=0&size=20"
        );

        const dealNames = [
          "nomad quartz watch",
          "aero-max runner",
          "protab 12.9",
          "omnipod speaker"
        ];

        const filtered = res.data.content.filter(p =>
          dealNames.includes(p.name.toLowerCase().trim())
        );

        setDeals(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);
  return (
    <div className="bg-[#f9f5ff] min-h-screen">

      {/* 🔹 Header */}
      <header className="sticky top-0 z-50 bg-[#f9f5ff]/80 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow">

        <div className="flex items-center gap-6">
          <h1
            className="text-2xl font-black text-[#0846ed] cursor-pointer"

          >
            ShopLite
          </h1>

          <span className="font-semibold text-[#0846ed]">
            Deals
          </span>
        </div>

        <div className="flex items-center gap-4">

          {/*  Home */}
          <span
            className="material-symbols-outlined cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/")}>
            home
          </span>

          {/* Cart */}
          <div
            className="relative flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <span className="material-symbols-outlined text-2xl hover:text-blue-600">
              shopping_cart
            </span>

            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </div>

        </div>
      </header>

      {/* 🔹 Hero Section */}
      <section className="px-6 py-12 flex flex-col md:flex-row items-center gap-10 max-w-7xl mx-auto">

        <div className="flex-1">
          <span className="text-sm text-blue-600 font-bold">
            ✨ DEAL OF THE WEEK
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-4">
            The Ultimate <br />
            <span className="text-blue-600">Soundscape.</span>
          </h1>

          <p className="text-gray-500 mt-4">
            Experience precision audio engineering with limited edition headphones.
          </p>

          <div className="flex items-center gap-4 mt-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              Shop the Deal
            </button>

            <div>
              <p className="line-through text-gray-400">$499</p>
              <p className="text-2xl font-bold">$299.40</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLuc6xbEJRwuY1T88u25M0IVn2axJ_6tSHBt46W_oNkv2pf8IWbfNmn76krqugMwzutnh2oz8DTpxlz_--grc9l0wkEwj7fZGPkL3mKnK7qrV2Djqwp4jz34Xwr4bS-raEdN1cEMJb4EUqWLwxVUtNxU0_h1jUGYbtNACEQoqs9mpqf7H6frME2WaF757KZ0KevMXEPoqUDJfEB4ocPBClAeexOJr4GeW5LDO2UiIt01Iu7OV-9tlvTmrDKZl_w9pw3hEqFd32Bk8"
            alt="deal"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* 🔹 Deals Grid */}
      <section className="px-6 pb-16 max-w-7xl mx-auto">

        <p className="text-center text-sm text-gray-500 mb-2">
          Curated deals for you
        </p>
        <h2 className="text-3xl font-semibold text-center mb-2 tracking-tight text-gray-900">
          Limited Offers
        </h2>

        <div className="w-16 h-[2px] bg-blue-600 mx-auto mb-8 rounded-full"></div>

      </section >

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <p>Loading deals...</p>
        ) : deals.length === 0 ? (
          <p>No deals found</p>
        ) : (
          deals.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow hover:shadow-lg flex flex-col h-full">

              <img
                src={
                  item.imageUrl.startsWith("http")
                    ? item.imageUrl
                    : `/products/${item.imageUrl}`
                }
                alt={item.name}
                className="w-full h-40 object-cover mb-3"
              />

              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="line-through text-gray-400 text-sm">
                    ${Math.round(item.price * 1.3)}
                  </p>
                  <p className="font-bold text-lg">
                    ${item.price}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  🛒
                </button>
              </div>

            </div>
          ))
        )}

      </div>
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-2xl text-center animate-fadeIn">

            <div className="text-5xl mb-4">🔒</div>

            <h2 className="text-2xl font-bold mb-2">
              Login Required
            </h2>

            <p className="text-gray-600 mb-6">
              You need to login before adding items to your cart.
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:scale-105 transition"
              >
                Login Now
              </button>

              <button
                onClick={() => setShowLoginPopup(false)}
                className="px-6 py-3 border rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div >
  );
};

export default TopDeals;

