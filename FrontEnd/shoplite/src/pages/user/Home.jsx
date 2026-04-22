import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [currentPage, setCurrentPage] = React.useState(1);
  const productsPerPage = 6;


  const backendProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    desc: p.description,
    price: `$${p.price}`,
    priceValue: p.price,
    image: p.imageUrl,
  }));
  const allProducts = backendProducts;

  const filteredProducts = allProducts.filter((product) => {
    if (!searchTerm) return true;

    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="bg-surface text-on-background min-h-screen flex flex-col glow-bg">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 h-16 bg-[#f9f5ff]/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-12 max-w-[1920px] mx-auto shadow-[0_1px_0_rgba(171,169,215,0.15)] shadow-[0_12px_32px_rgba(43,42,81,0.06)]">
        <div className="text-2xl font-black tracking-tighter text-[#0846ed] font-['Manrope']">
          ShopLite
        </div>

        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-surface-container-highest/40 border-none rounded-sm px-10 py-2 text-sm focus:ring-2 focus:ring-primary-fixed-dim/30 focus:bg-surface-container-lowest transition-all"
            placeholder="Search products..."
          />
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
            search
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/cart")}
            className="p-2 rounded-lg text-[#2b2a51] opacity-70 hover:bg-[#f2f1ff] transition relative"
          >
            <span className="material-symbols-outlined">shopping_cart</span>

            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              const isLoggedIn = localStorage.getItem("token");

              if (isLoggedIn) {
                navigate("/profile");
              } else {
                navigate("/login");
              }
            }}
            className="p-2 rounded-lg text-[#2b2a51] opacity-70 hover:bg-[#f2f1ff] transition"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-grow pt-16 flex  w-full">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col gap-y-2 p-6 h-screen w-64 fixed left-0 border-r border-[#aba9d7]/15 bg-[#f9f5ff] pt-20">
          {/* Title */}
          <div className="mb-6">
            <h2 className="text-[#0846ed] text-lg font-bold font-['Manrope']">
              Explore
            </h2>
            <p className="text-sm text-[#2b2a51]/60">
              Navigate through ShopLite
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {/* Home */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 p-3 hover:text-[#0846ed] hover:bg-[#f2f1ff] transition cursor-pointer rounded-lg"
            >
              <span className="material-symbols-outlined">home</span>
              Home
            </div>

            {/* Categories */}
            <div
              onClick={() => navigate("/categories")}
              className="flex items-center gap-3 p-3 hover:text-[#0846ed] hover:bg-[#f2f1ff] transition cursor-pointer rounded-lg"
            >
              <span className="material-symbols-outlined">category</span>
              Categories
            </div>

            {/* Brands */}
            <div
              onClick={() => navigate("/brands")}
              className="flex items-center gap-3 p-3 hover:text-[#0846ed] hover:bg-[#f2f1ff] transition cursor-pointer rounded-lg"
            >
              <span className="material-symbols-outlined">loyalty</span>
              Brands
            </div>

            {/* Top Deals */}
            <div
              onClick={() => navigate("/top-deals")}
              className="flex items-center gap-3 p-3 hover:text-[#0846ed] hover:bg-[#f2f1ff] transition cursor-pointer rounded-lg"
            >
              <span className="material-symbols-outlined">stars</span>
              Top Deals
            </div>
            {/* Order History */}
            <div
              onClick={() => navigate("/orders")}
              className="flex items-center gap-3 p-3 hover:text-[#0846ed] hover:bg-[#f2f1ff] transition cursor-pointer rounded-lg"
            >
              <span className="material-symbols-outlined">receipt_long</span>
              Order History
            </div>
            <div
              onClick={() => navigate("/tickets")}
              className="flex items-center gap-3 p-3 hover:text-[#0846ed] hover:bg-[#f2f1ff] transition cursor-pointer rounded-lg"
            >
              <span className="material-symbols-outlined">
                confirmation_number
              </span>
              Ticket Management
            </div>
          </nav>
        </aside>

        {/* RIGHT SIDE CONTENT */}
        <div className="flex-1 lg:ml-64">
          {/* HERO SECTION */}
          <section className="px-8 md:px-12 py-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* LEFT TEXT */}
              <div className="max-w-xl space-y-6">
                <h1 className="text-5xl font-black font-['Manrope'] leading-tight">
                  Elevate Your <br />
                  <span className="text-primary">Shopping Experience</span>
                </h1>

                <p className="text-on-surface-variant text-lg">
                  Discover premium products curated for modern lifestyles.
                  Minimal. Elegant. Powerful.
                </p>

                <div className="flex gap-4 pt-2">
                  <button className="px-6 py-3 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold shadow-lg hover:scale-[0.97] transition">
                    Shop Now
                  </button>

                  <button className="px-6 py-3 rounded-xl border border-outline-variant text-on-background font-semibold hover:bg-surface-container-low transition">
                    Explore
                  </button>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH94kYs6-Y66d0xsysVG-JbvFSFtbp-Svb_9yKITM7TRKIoqXeUh98v5XXrAU3k5kYs6ZmFjJiPbLjNC-u7si8Xvv4w2w5q_iV8Q90VTaoddIaNgVAj6T0Z9GwWraDnTJ6RSE4LbsiGPPG9hELH4C_4H2bF_5k-7qZxWHPrabyrK69W6Q3l3RQT5dVH_cjAUqrbJ1yL9l7xPqBEWYr7oXszEYuflK87kOtAXT9wOhfNV9OEb2Ab5PaKGU7XFxt1Gu9VqlXmInegq8"
                  className="w-full max-w-md rounded-3xl shadow-[0_20px_60px_rgba(8,70,237,0.2)]"
                />

                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>
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
                <p className="text-[#585781]">
                  Curated products for your modern lifestyle.
                </p>
              </div>

              <button className="bg-surface-container-low px-4 py-2 rounded-lg text-sm font-semibold">
                Sort by: Newest
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group relative flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_12px_32px_rgba(43,42,81,0.06)] hover:shadow-[0_20px_48px_rgba(8,70,237,0.1)] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-surface-container relative">
                    <img
                      src={product.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {product.tag && (
                      <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.tag === "Sale"
                          ? "bg-primary text-on-primary"
                          : "bg-white/90 backdrop-blur-md text-primary"
                          }`}
                      >
                        {product.tag}
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-on-surface-variant text-sm mb-4">
                      {product.desc}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-black text-on-surface">
                        {product.price}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="bg-gradient-to-br from-primary to-primary-container text-on-primary p-3 rounded-xl shadow-lg hover:shadow-primary/40 active:scale-95 transition-all duration-300"
                      >
                        <span className="material-symbols-outlined">
                          add_shopping_cart
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        {/* Pagination */}
        <section>
          <div className="mt-20 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-semibold ${currentPage === i + 1
                    ? "bg-primary text-on-primary"
                    : "hover:bg-surface-container-high"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="p-2 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 border-t border-[#aba9d7]/15 bg-[#f9f5ff]">
        <div className="lg:ml-64 px-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="font-['Manrope'] font-bold text-[#0846ed] text-lg">
            ShopLite
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a className="text-xs uppercase tracking-wide text-[#2b2a51]/60 hover:text-[#0846ed] underline underline-offset-4 transition">
              Privacy Policy
            </a>
            <a className="text-xs uppercase tracking-wide text-[#2b2a51]/60 hover:text-[#0846ed] underline underline-offset-4 transition">
              Terms of Service
            </a>
            <a className="text-xs uppercase tracking-wide text-[#2b2a51]/60 hover:text-[#0846ed] underline underline-offset-4 transition">
              Support
            </a>
          </div>

          <div className="text-xs uppercase tracking-wide text-[#2b2a51]/60 text-center md:text-right">
            © 2024 ShopLite Luminous Editorial. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
