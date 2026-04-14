import React from "react";
import { useNavigate } from "react-router-dom";

const TopDeals = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f9f5ff] min-h-screen">

      {/* 🔹 Header */}
      <header className="sticky top-0 z-50 bg-[#f9f5ff]/80 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow">
        
        <div className="flex items-center gap-6">
          <h1
            className="text-2xl font-black text-[#0846ed] cursor-pointer"
            onClick={() => navigate("/")}
          >
            ShopLite
          </h1>

          <span className="font-semibold text-[#0846ed]">
            Deals
          </span>
        </div>

        {/* 🔹 Home Icon */}
        <span
          className="material-symbols-outlined cursor-pointer"
          onClick={() => navigate("/")}
        >
          home
        </span>
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

        <h2 className="text-2xl font-bold mb-6">
          Limited Flash Offers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {deals.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow hover:shadow-lg">

              <img
                src={item.img}
                alt={item.name}
                className="w-full h-40 object-cover mb-3"
              />

              <h3 className="font-semibold">{item.name}</h3>

              <p className="text-gray-500 text-sm">{item.desc}</p>

              <div className="mt-3 flex justify-between items-center">
                <div>
                  <p className="line-through text-gray-400 text-sm">
                    ${item.oldPrice}
                  </p>
                  <p className="font-bold text-lg">
                    ${item.price}
                  </p>
                </div>

                <button className="bg-gray-200 p-2 rounded">
                  🛒
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
};

export default TopDeals;

const deals = [
  {
    name: "Nomad Quartz Watch",
    desc: "Surgical steel with sapphire crystal.",
    price: 159,
    oldPrice: 240,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyBwB_IR_PeaWfG52to4-Pv61cKrCvle6F4aGlQY9SZZnniSowNY_9MgDGysTytLwUI-A-nkXy4roK0AqCXin9fxTFmxcd3IZZSphMEGYJE4wCValiXQcHyu5idFRDTrVfH4LAWGhTJvoHtoly1CZAM3Mna2FrqkS5MgexHB9nZ_maxRL9u-_AnmuA-Tn6vDNPQg8De1bsjQQNQpOiVIffhSzkM-cCH3j01v1rzXxkMauMy3tdrdwYqNSu-FuwIHJZTZbJaSP9V14"
  },
  {
    name: "Aero-Max Runner",
    desc: "Breathable sneakers with air cushioning.",
    price: 99,
    oldPrice: 180,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDqXrnlQkONvl6mOB5ajWWrOAoTiNdTWy-Kge45G6DsVMVrL1pZAAV2pBg6EI-7M5bRnlxG7YolPxYeK6vYzEvrLCKSBlpMf6DFfb7xpXSnGiKQVTzB4Uif5Hzzjo9NJ10vmEJIAMmGLDaYUGQ15TCauEGf-UdJtZs4gATgkoSklAp_iGEDUtVTqm4QEPZ_tizwXh0Sj0bT0CI-w98kmIhNE7JxjkC9CteFreZkVZZxqKpxFL0lJnUVBREFr2S3diSC66IOY02e6g"
  },
  {
    name: "ProTab 12.9",
    desc: "Advanced tablet for professionals.",
    price: 899,
    oldPrice: 1099,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4rY6ycFfNSPIH-gG7LbwfAaCO4WMz1nK5r9IvNUm-tmOAgTNgQ0qHfBr53RA7PsLw3LrLYFFsEXhG3V6wzt7MK_vGki3ZhYNfTdmOF60HceyRU3nGpDUOayjQYrHVy4BXIPs4De64nBJq1WzzI2DBn-3Nuj90o0XRAaL04vmm_5k2Y1nuWxRHSNy4Bt0peLkU01ovV7VE88IEZME5oSzOCOcZZr0u_ewCQJ8HLonGtFTQYeLc97Zt_CfImBvNV21G0Ip9uicY5A4"
  },
  {
    name: "OmniPod Speaker",
    desc: "360° immersive sound system.",
    price: 129,
    oldPrice: 199,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVAK-A9dnuVAByNc5Li203LAB773BvI5SUawKErgV_-UWxvOGDeNGl6tV9FyKhDQAhl-ZsAEz5t3ikcMz-hkwEfU8PNpo1-h3DbaASw9eJBHew34X5GVG-3gpHGYj2QT9xelnP6temAh8a9zX0LYB5qiQAjN7q_8V00qtfX-6EeqwIZlz6Sdo0QGQssd2XuKI2oXsOP1FySzEfbAXShgcJAR-HXlMxLSxrh1SZN-R2-zsAt5SpGQ1xtrtBF1uQXBpG-V0kvdNRSDY"
  }
];