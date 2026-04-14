import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Brands = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f9f5ff] min-h-screen pb-20">
      {/* 🔹 Top Navbar */}
      <header className="fixed top-0 w-full z-50 bg-[#f9f5ff]/80 backdrop-blur-xl shadow">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <h1
              className="text-2xl font-black text-[#0846ed] cursor-pointer"
              onClick={() => navigate("/")}
            >
              ShopLite
            </h1>

            <nav className="hidden md:flex gap-6">
              <span className="cursor-pointer" onClick={() => navigate("/")}>
                Shop
              </span>

              <span className="text-[#0846ed] font-bold border-b-2 border-[#0846ed]">
                Brands
              </span>

              <span>Wishlist</span>
            </nav>
          </div>

          {/* 🔹 Home Icon */}
          <FaHome
            className="text-xl cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      </header>

      {/* 🔹 Main */}
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        {/* 🔹 Hero */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            Curated <span className="text-[#0846ed] italic">Collections</span>
          </h1>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Discover an editorial selection of global brands defined by quality,
            innovation, and exceptional craftsmanship.
          </p>
        </section>

        {/* 🔹 Search + Filter */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-3 bg-white rounded-xl shadow-sm">
            <input
              type="text"
              placeholder="Find a specific brand..."
              className="w-full md:max-w-md p-3 rounded-lg border"
            />

            <div className="flex gap-2 overflow-x-auto">
              <button className="px-4 py-2 bg-gray-200 rounded-lg">All</button>
              <button className="px-4 py-2 bg-gray-200 rounded-lg">
                Technology
              </button>
              <button className="px-4 py-2 bg-gray-200 rounded-lg">
                Lifestyle
              </button>
              <button className="px-4 py-2 bg-gray-200 rounded-lg">
                Fashion
              </button>
            </div>
          </div>
        </section>

        {/* 🔹 Brand Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="w-16 h-16 mb-4">
                <img src={brand.img} alt={brand.name} />
              </div>

              <h3 className="text-lg font-bold mb-2">{brand.name}</h3>

              <p className="text-sm text-gray-500 mb-4">{brand.desc}</p>

              <div className="flex justify-between items-center">
                <button className="text-blue-600 text-sm">View Store →</button>

                <span className="text-xs uppercase text-gray-400">
                  {brand.category}
                </span>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Brands;

const brands = [
  {
    name: "Lumina Tech",
    category: "Technology",
    desc: "Pioneering smart living with high-fidelity electronics.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4NHNqYvhT-NqJIathLap-_W6a2XSigE2Ksw2RJqE4uR0ktEybp94fK47uNIhT5an_MoxOj3LSImpAFbTk_VPBo1frZG-I9YNxYb0-2f_1K_1vQ3orVSZwcboM1EB01ZfxKxuHFOgqWps0pJk2o2o1coLUybEXBH-KegP45dQ4I64LgC0h0h9-rpAzXvpXKv9L7BlABdphPpaKPMXYQ6xzySwzj4G6Fe4E0YnX51g5VuNYqa1e281txB0Z2wBGallZ-LVuWu5NhgE"
  },
  {
    name: "Ethereal Form",
    category: "Fashion",
    desc: "Sustainable apparel with timeless design.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsKrBjqKObRNahZ820wDGlWtt3T2Lp1cue_pb8VJttubtedGYs-ed7iueUi2UpltF8L9Rl0XTIkBuwN_SSsIBJ6zRy-9VAhGQ4Pj-QdEFUHrZSGhg1CzDkxgo9P6SGykcZ-LVGek6LxQpaGKkYfYyPM52vqv4NNtklyP1Unubz7PjoH7MQsYPLsJvTZla_aYGaK6SvPXiBRrA8hH6EpvEj5YhxFmKF2J_utsQwGFGoiWKKFmLl8Ivq-6NWqk3nvvaibpV_sMib1eA"
  },
  {
    name: "Voda Studio",
    category: "Lifestyle",
    desc: "Modern interior objects with organic design.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRD_xYP3IJR8pDXJossebjfMhBBwUCqYpC64CBvSZPm1tA4hBQOY6wNpw8ZLgwmc-wLw6puB4ehcjw1gMw9Q7Jbtkte8qYf9I-6wQ2bCMQX6IEq-cFIgZz1DPJtgWxwKBZ0wdxrZfOW0zVkFlN1N1y-ksR4Upzj9Y1fe104ZE_UDN9T-ARvDYAqcS9G7bYYqG6abLGA19YejaMl-UlDCAkigZcuYJ4EWwa5AuFnRN2YCrGUkTiLaSN0AI6EkkhawxmA0jHT0CWqdI"
  },
  {
    name: "Aura Skin",
    category: "Beauty",
    desc: "Science-backed skincare with natural extracts.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnpucnNfFk4uwrwidQ8HijnvBAq6TlV2gfNAQA1SgMSSlX4WP0_DRZk_MfQozAllLbh_ptK-s-Iea0gSEDh3ZBmc7ZyWHc1xdmYc8o4TF7UqEAGi5MlYtYV3qHs4xPwXF0Z9cUmdlAxLBW79vYRq7EFBHUyNoK3EAbt0Bh_fiEG3i7zu0_TEqqIRAvGLEwkCBJ0brsvkg4CbEGE1ULOAMXyCdUP30Qj3nywXpRJhpcE2wG6l6aoSHAOzAIKU8ZuVy0bep416aSRmk"
  },
  {
    name: "Sonic Flow",
    category: "Audio",
    desc: "Premium wireless sound experiences.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgLSetNciNisGykLT21UHeVw5Ern0lPekn1DpmOi8ex5DjDrllXdfFgH5MKlEzOmQedzkK4RNNbfvkZTSVtUsgAXZxw2N-1dgc5KgMMDw4Bd6Is_P_zb11gfC8bQ0aiT0ftiZPbs9k9Nn_TDgqYlcfpm8YR8rrs8gA4KS919mUlFm5hOyWBG4TMAFnn-mHN5fb8h5zhb5NqUdrKRlJ0aH-eVX9WBEnQE2-kM4YBZMpM5gcPta3EnBe-Rc_5nbz1owaV7kN2jvrDjE"
  },
  {
    name: "Velocity Lab",
    category: "Mobility",
    desc: "Urban mobility engineered for performance.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWHuRyhKee7SJGjKNObO_XEucvDFzq0iBN9yehoUzm3sTR2q3rxisPj7a1cfCE2KNL4mAx7Jwd_JAOoBQWCF6k_T4Yx1zng9l2nQPprsC4-fIxrXusyNxA-A6sEn2q0KrS0G2y05skp79eb6OrnZFJM4Z2cExFhlyAboipXci3Kwxko9ptE4vKtDyj9NWWaUMUGI4ym8Cp_aFci1OPtJsomdGcelltPN8eqTjR4eonuMr-7u6hWwLtJrTTZBJ59I0v27BsUTAkkZw"
  },
  {
    name: "Wild Root",
    category: "Home",
    desc: "Handcrafted natural home goods.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWOs8G9BwIvJu7cOWL-8L7D-6m0Lq1gfZd7r7z0YI6EXaB43xjgPCK4cAuYrFSYy-UDsAFN-DFl5BX5SwMVVkEjjm9A_1l1-ZbNMaSHkjXg50JLqNiOCmwjiRc6rtUMKYQPTq0tbtxgjSYkF4uUC1P5OKh8v_qbg9ps1Lm3uhdp2Atao2D77PWnGidKRHU_9N_KwIvGoq6ypbwnht61-yXYVpXQTpGaElUAchdsARZnjwKbU6VCGWb2xX3zQcBNZmPyDewxcJ4wIE"
  },
  {
    name: "Apex Core",
    category: "Fitness",
    desc: "High-performance activewear and tools.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_okZ05HolmT4cXzX8Z3tfrIjHIQox43U3EIflkbiiRqGD7q0l-a9dcng-RhN3V31VVOuhNtXZSy9hzNkVrDY8IfsVShusXAsTL3MF4bg0rMQygDsGHv5w3SKweKlzoIBVJIG6nLm_LCIwiYuUP6YuzJ6UR_sBDGIOdNujHFnpUhgZwvhQbrWYl-GzcUo0L0pq4UFlJIKZnUD6hVh1af3rLziWdjYO98lR0-E3in25WbAuLMQBblpJQHquR_ie7KnD0geQu9vxUOw"
  }
];