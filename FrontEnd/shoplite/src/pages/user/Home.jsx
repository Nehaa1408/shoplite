import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  MdHome,
  MdCategory,
  MdLocalOffer,
  MdStars,
  MdReceipt,
  MdConfirmationNumber,
  MdSearch,
  MdShoppingCart,
  MdAccountCircle,
  MdChevronLeft,
  MdChevronRight,
  MdAddShoppingCart
} from "react-icons/md";
import axios from "axios";
const Home = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/products?page=${currentPage - 1}&size=6`
        );
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);


  const productsPerPage = 6;


  const backendProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    desc: p.description,
    price: `$${p.price}`,
    priceValue: p.price,
    image: p.imageUrl.startsWith("http")
      ? p.imageUrl
      : `/products/${p.imageUrl}`
  }));
  const allProducts = backendProducts;

  const filteredProducts = allProducts.filter((product) => {
    if (!searchTerm) return true;

    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const currentProducts = filteredProducts;

  const [totalPages, setTotalPages] = React.useState(1);
  const [showLoginPopup, setShowLoginPopup] = React.useState(false);
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#eef2ff] text-on-background flex flex-col">
      <div className="absolute inset-0 -z-10">

        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-500/25 rounded-full blur-[120px]"></div>

        <div className="absolute top-10 right-[-120px] w-[350px] h-[350px] bg-sky-400/25 rounded-full blur-[120px]"></div>

        <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[140px]"></div>

        <div className="absolute top-[30%] left-[30%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>
      {/* CONTENT WRAPPER */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 h-16 bg-[#f9f5ff]/70 backdrop-blur-md flex justify-between items-center px-6 md:px-12 max-w-[1920px] mx-auto border-b border-[#e6e4ff]">
          <div className="text-xl md:text-2xl font-black tracking-tight text-[#0846ed] font-['Manrope']">
            ShopLite
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white/70 backdrop-blur-md rounded-md px-10 py-2 text-sm border border-[#e6e4ff] focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all"
              placeholder="Search products..."
            />
            <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-4">
            <button
              aria-label="Open cart"
              onClick={() => navigate("/cart")}
              className="p-2 rounded-lg text-[#2b2a51] hover:bg-white/60 transition-all duration-200 relative"
            >
              <MdShoppingCart size={22} />

              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
            <button aria-label="Open profile" onClick={handleProfileClick}>
              <MdAccountCircle size={22} />
            </button>
          </div>
        </nav>

        {/* Main */}
        <main className="flex-grow pt-16 flex  w-full">
          {/* Sidebar */}
          <div className="lg:w-64 hidden lg:block">
            <aside className="hidden lg:flex flex-col gap-y-2 p-6 h-screen w-64 fixed left-0 border-r border-white/30 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-xl pt-20">
              {/* Title */}
              <div className="mb-6">
                <h2 className="text-[#0846ed] text-lg font-bold font-['Manrope']">
                  Explore
                </h2>
                <p className="text-sm text-[#6b6a85]">
                  Navigate through ShopLite
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { name: "Home", icon: <MdHome size={20} />, path: "/" },
                  { name: "Categories", icon: <MdCategory size={20} />, path: "/categories" },
                  { name: "Brands", icon: <MdLocalOffer size={20} />, path: "/brands" },
                  { name: "Top Deals", icon: <MdStars size={20} />, path: "/top-deals" },
                  { name: "Order History", icon: <MdReceipt size={20} />, path: "/orders" },
                  { name: "Ticket Management", icon: <MdConfirmationNumber size={20} />, path: "/tickets" }
                ].map((item, index) => {
                  const isActive = window.location.pathname === item.path;

                  return (
                    <div
                      key={index}
                      onClick={() => navigate(item.path)}
                      className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden hover:translate-x-1 ${isActive ? "bg-primary/10" : ""
                        }`}
                    >
                      {/* Glow */}
                      <span className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}></span>

                      {/* Icon */}
                      <span className={`relative z-10 transition ${isActive ? "text-blue-600" : "text-[#6b6a85] group-hover:text-blue-600"
                        }`}>
                        {!loading && item.icon}
                      </span>

                      {/* Text */}
                      <span className={`relative z-10 font-medium transition ${isActive ? "text-blue-600" : "text-[#6b6a85] group-hover:text-blue-600"
                        }`}>
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </nav>
            </aside>
          </div>
          {/* RIGHT SIDE CONTENT */}
          <div className="flex-1 ">
            {/* HERO SECTION */}
            <section className="px-8 md:px-12 py-16">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-16 bg-white/70 backdrop-blur-xl p-10 md:p-14 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.12)] border border-white/40 relative overflow-hidden transition-all duration-500 hover:shadow-[0_30px_100px_rgba(0,0,0,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-blue-200/30 pointer-events-none "></div>
                {/* LEFT TEXT */}
                <div className="max-w-xl space-y-6">
                  <h1 className="text-4xl md:text-5xl font-black font-['Manrope'] leading-tight tracking-tight">
                    Elevate Your <br />
                    <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Shopping Experience</span>
                  </h1>

                  <p className="text-on-surface-variant text-lg">
                    Discover premium products curated for modern lifestyles.
                    Minimal. Elegant. Powerful.
                  </p>

                  <div className="flex gap-4 pt-2">
                    <button className="relative px-6 py-3 rounded-xl bg-gradient-to-br from-primary to-primary-soft text-white font-semibold shadow-glow hover:shadow-glow-soft transition-all duration-300">
                      <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 hover:opacity-100 transition"></span>
                      Shop Now
                    </button>

                    <button className="px-6 py-3 rounded-xl border border-outline-variant text-on-background font-semibold hover:bg-surface-container-low transition">
                      Explore
                    </button>
                  </div>
                </div>

                {/* RIGHT IMAGE */}
                {/* HERO SECTION */}
                <div className="relative">
                  <div style={{ width: "400px", height: "500px" }}>
                    <img
                      src={`${import.meta.env.BASE_URL}products/p1.webp`}
                      loading="eager"
                      fetchPriority="high"
                      width="400"
                      height="500"
                      className="w-full max-w-md rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
                      alt="Premium shopping experience"
                    />
                  </div>

                  <div className="absolute -top-16 -left-16 w-60 h-60 bg-primary/20 blur-[100px] rounded-full"></div>
                </div>
              </div>
            </section>

            {/* Product Section */}
            <section className="p-8 md:p-12">
              <div className="mb-10 flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-black mb-2">
                    Featured Collection
                  </h1>
                  <p className="text-[#6b6a85]">
                    Curated products for your modern lifestyle.
                  </p>
                </div>


              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {loading ? (
                  [...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-[350px] bg-gray-200 animate-pulse rounded-xl"
                    ></div>
                  ))
                ) : (
                  currentProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="group relative flex flex-col bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-[6px] hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] cursor-pointer"
                    >
                      <div className="overflow-hidden bg-white/50 relative group">
                        <img

                          src={product.image}
                          loading="lazy"
                          decoding="async"
                          width="300"
                          height="375"
                          alt={product.name}

                          onError={(e) => {
                            e.target.src = "/products/p1.webp";
                          }}
                          className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition duration-300"></div>
                        {product.tag && (
                          <div
                            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.tag === "Sale"
                              ? "bg-primary text-on-primary"
                              : "bg-white/90 backdrop-blur-md text-blue-600"
                              }`}
                          >
                            {product.tag}
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-lg font-bold text-on-surface mb-1 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h2>

                        <p className="text-on-surface-variant text-sm mb-4">
                          {product.desc}
                        </p>

                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-xl font-black text-on-surface">
                            {product.price}
                          </span>

                          <button
                            aria-label={`Add ${product.name} to cart`}
                            onClick={(e) => {
                              e.stopPropagation();

                              const token = localStorage.getItem("token");

                              if (!token) {
                                setShowLoginPopup(true);
                                return;
                              }

                              addToCart(product);
                            }}
                            className="relative bg-gradient-to-br from-primary to-primary-soft text-white p-3 rounded-xl shadow-glow hover:shadow-glow-soft  transition-all duration-300 ease-out hover:scale-[1.08] active:scale-[0.92] "
                          >
                            <MdAddShoppingCart size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
            {/* Pagination */}
            <section>
              <div className="mt-20 flex justify-center items-center gap-4">
                <button
                  aria-label="Previous page"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="p-2 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low transition-colors"
                >
                  <MdChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${currentPage === i + 1
                        ? "bg-primary/10 text-blue-600"
                        : "text-on-surface-variant hover:bg-surface-container-high"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  aria-label="Next page"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="p-2 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low transition-colors"
                >
                  <MdChevronRight size={20} />
                </button>
              </div>
            </section>
          </div>

        </main >

        {/* Footer */}
        < footer className="w-full py-12 border-t border-[#aba9d7]/15 bg-gradient-to-b from-white/90 to-white/60 backdrop-blur-xl" >
          <div className="lg:ml-64 px-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="font-['Manrope'] font-bold text-[#0846ed] text-lg">
              ShopLite
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a className="text-xs uppercase tracking-wide text-[#6b6a85] hover:text-[#0846ed] underline underline-offset-4 transition">
                Privacy Policy
              </a>
              <a className="text-xs uppercase tracking-wide text-[#6b6a85]hover:text-[#0846ed] underline underline-offset-4 transition">
                Terms of Service
              </a>
              <a className="text-xs uppercase tracking-wide text-[#6b6a85]hover:text-[#0846ed] underline underline-offset-4 transition">
                Support
              </a>
            </div>

            <div className="text-xs uppercase tracking-wide text-[#6b6a85] text-center md:text-right">
              © 2024 ShopLite Luminous Editorial. All rights reserved.
            </div>
          </div>
        </footer >
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
                  className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:scale-105 transition"
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
    </div>
  );
};

export default Home;
