import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";


import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import FeaturedSection from "../../components/FeaturedSection";
import ProductGrid from "../../components/ProductGrid";
import CategoryBar from "../../components/CategoryBar";
import Footer from "../../components/Footer";
import useProducts from "../../hooks/useProducts";


import {
  MdHome,
  MdCategory,
  MdLocalOffer,
  MdStars,
  MdShoppingCart
} from "react-icons/md";
import { fetchCategories } from "../../services/api";

const Home = () => {

  // STATE
  const [categories, setCategories] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showLoginPopup, setShowLoginPopup] = React.useState(false);
  // ROUTER
  const navigate = useNavigate();
  const location = useLocation();

  // CONTEXT 
  const { addToCart, cart } = useCart();

  const category = React.useMemo(() => {
    return new URLSearchParams(location.search).get("category");
  }, [location.search]);

  const { filteredProducts, loading, totalPages } =
    useProducts(category, currentPage, searchTerm);

  const categoryIcons = {
    electronics: <MdCategory size={18} />,
    fashion: <MdStars size={18} />,
    footwear: <MdLocalOffer size={18} />,
    home: <MdHome size={18} />,
    accessories: <MdShoppingCart size={18} />
  };
  // HANDLERS
  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/profile" : "/login");
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    addToCart(product);
  };

  // Reset page when category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // ================= FETCH CATEGORIES =================
  React.useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Category fetch error:", err);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#eef2ff] text-on-background flex flex-col">

      {/* 🌌 BASE (deeper, richer) */}
      <div className="fixed inset-0 -z-30 
bg-gradient-to-br from-[#eef2ff] via-white to-[#f5eaff]" />

      {/* 🌊 WAVE LAYERS */}
      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">

        {/* LEFT */}
        <div className="absolute top-[-150px] left-[-150px] w-[700px] h-[700px]
bg-indigo-700/80 blur-[220px] rounded-full
animate-[waveFloat_18s_ease-in-out_infinite]" />

        {/* RIGHT */}
        <div className="absolute bottom-[-150px] right-[-150px] w-[700px] h-[700px]
bg-purple-700/80 blur-[220px] rounded-full
animate-[waveFloatReverse_22s_ease-in-out_infinite]" />

        {/* CENTER SOFT MERGE */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2
  w-[900px] h-[400px]
  bg-gradient-to-r from-indigo-400/40 via-purple-400/30 to-indigo-400/40
  blur-[160px] rounded-full
  animate-[waveFloat_20s_ease-in-out_infinite]" />

      </div>

      {/* 🧊 GLASS DIFFUSION LAYER (THIS IS THE MAGIC) */}
      <div className="fixed inset-0 -z-10 backdrop-blur-[20px] bg-white/5" />
      <div className="fixed inset-0 -z-5 opacity-[0.04] pointer-events-none
bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Navbar */}

        <Navbar
          onNavigate={navigate}
          location={location}
          cart={cart}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCurrentPage={setCurrentPage}
          handleProfileClick={handleProfileClick}
        />
        {/* Main */}
        <main className="flex-grow pt-32 md:pt-36 w-full">

          {/* RIGHT SIDE CONTENT */}
          <div className="flex-1 ">

            {/* HERO SECTION */}

            <Hero />

            <CategoryBar
              categories={categories}
              activeCategory={category}
              categoryIcons={categoryIcons}
              onSelect={(catName) => {
                navigate(`/?category=${catName}`);
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            />

            {/* ===== FEATURED BENTO SECTION ===== */}
            <FeaturedSection />

            {/* Product Section */}
            <section id="products" className="px-6 md:px-12 py-14 max-w-[1400px] mx-auto">

              {/* HEADER */}
              <div className="mb-12 flex justify-between items-center">
                <h1 className="text-3xl md:text-4xl font-black">
                  Trending Now
                </h1>

                {/* arrows (optional UI) */}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="w-10 h-10 rounded-full border border-indigo-200 text-indigo-500 hover:bg-white transition"
                  >
                    ‹
                  </button>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="w-10 h-10 rounded-full border border-indigo-200 text-indigo-500 hover:bg-white transition"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* GRID */}
              <ProductGrid
                products={filteredProducts}
                loading={loading}
                onAddToCart={handleAddToCart}
                onView={(id) => navigate(`/product/${id}`)}
              />


            </section>
          </div>

        </main >

        {/* Footer */}

        <Footer />

        {
          showLoginPopup && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">

              {/* CARD */}
              <div className="bg-white rounded-2xl p-8 w-[90%] max-w-sm shadow-[0_20px_60px_rgba(0,0,0,0.2)] text-center animate-[fadeIn_0.3s_ease]">

                {/* ICON */}
                <div className="text-4xl mb-4">🔒</div>

                {/* TITLE */}
                <h2 className="text-xl font-bold mb-2">
                  Login Required
                </h2>

                {/* TEXT */}
                <p className="text-gray-500 mb-6 text-sm">
                  Please login to continue adding items to your cart.
                </p>

                {/* BUTTONS */}
                <div className="flex gap-3 justify-center">

                  <button
                    onClick={() => {
                      setShowLoginPopup(false);
                      navigate("/login");
                    }}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:scale-105 transition"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => setShowLoginPopup(false)}
                    className="px-5 py-2.5 border rounded-lg font-medium hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>

                </div>

              </div>
            </div>
          )
        }

      </div >
    </div >
  );
};

export default Home;
