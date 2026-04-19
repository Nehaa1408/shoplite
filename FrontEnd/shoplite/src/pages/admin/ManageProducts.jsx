import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ManageProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const products = [
    {
      id: 1,
      name: "Luminous Pro Headphones",
      sku: "LH-90210",
      category: "Electronics",
      price: "$299.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBe_YgIV_S6YIOra9z2foFrRyqdgHmkC75HK_D8-x8EIdo4ZKkvUvPC7HPyZQSSR647EjsP-4xqWPZZKB71NjB1mD-V6frLMgUNbyoqdB_ghvQ0tv9iDiQPpXogBkXQ6ulYLt45zX1xuquTGv17Qr5qHFAZrYlGnPSGWmAmgqenti5xu3CFoPvgu4bP7LwqATMCLGGn7k4tAXHzuINLtp98emnTgMUSY-I6JE3_s8z3q-D8Q6jlE-4tKjmssL4nG46uned3v-9sDz8",
    },
    {
      id: 2,
      name: "Core Watch Series X",
      sku: "CW-4423",
      category: "Wearables",
      price: "$449.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB_W-zVwXPBmUw-V_XNmuyoi0IR6zzKcTRMKM02MdG-0YOTR-W8htMm6fi3wcKCwpARDv8P9XoJuaUQHQWterY1xg9_1op8RMFXwbWG0rAZ_zm9XZz5s8LRVb7UfM5RTPl-sPWtJ0fCYzdVn4RZZY9W2XCoRksksfbK8x1xzG5CrN1VCFa7o3XKj7ZlD9364C1283pFdbK_Ke61ypwCBq-EcwC3tTflkZeeW5tc2dH7VBRkOl4oWMjLCrzaWXP_fUf4FqFn-iQy1y8",
    },
    {
      id: 3,
      name: "Velocity Knit Sneakers",
      sku: "VK-3312",
      category: "Footwear",
      price: "$120.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB_7C3UAjkwjtYbvFo0K1hX6-MO0oEY4xaYAgzJppO-jlSz_iWzZB-zNduxY6qttp4DfMoiyipnYe-UN5uEV394B0TGjB6wIrQork2lKYfqpFZDYCVIxmhX1m8cZ2G0binuhIK-BpQnVxRHlAuerDV10rwfw_OWv18aYQIVdQ4IZv7WJNEEqVi3WmaG710HHiBK0jzpGSyckRt1lYeSaqZsku9mRvyy67PGmoBqjcgK_OIq5E5-59MtVAvLunK60vbaBeekhhFayKM",
    },
    {
      id: 4,
      name: "Morning Glow Roast (1lb)",
      sku: "MG-5501",
      category: "Groceries",
      price: "$18.50",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDQNzJ38c40oW8hUrZ1e50shvKDQWZePPy_RJXJijU8-7n9bAKRlu0u4Ticz3jhTzVOw09zPGzjF9U2QfJD7Wyo17T239Q74VgeDeD1u7JZg4qneX6EJEPdx-XiludVxNQeExMQw5A0nsJdf0Rt84-78t6Z2wZRM6vcsd_ai7GEh9Q3jL_Tm0uM_NKHCbWHi-9x7KUUPMWT4mrcwLLMiHkHhrxMiznfdyPt6aDqAsYi_pCGDLZuNTl8Lf_PLYF90efl5Ey9212Wpis",
    },
  ];

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* HEADER */}
      <header className="fixed top-0 w-full h-16 flex justify-between items-center px-6 bg-surface/80 backdrop-blur-xl shadow z-50">
        <h1 className="text-xl font-bold text-primary">ShopLite Admin</h1>

        <div className="flex items-center gap-4">
          <input
            placeholder="Search products..."
            className="hidden md:block px-4 py-2 rounded-lg bg-surface-container-low"
          />
          <span className="material-symbols-outlined">notifications</span>
          <span className="material-symbols-outlined">settings</span>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-16 w-64 h-full bg-surface border-r hidden md:flex flex-col p-4">
        <div className="mb-6">
          <h2 className="font-bold text-primary">ShopLite</h2>
          <p className="text-xs text-on-surface-variant">ADMIN CONSOLE</p>
        </div>

        <div className="space-y-2">
          <div className="p-3 hover:bg-surface-container rounded-lg cursor-pointer">
            <div
              onClick={() => navigate("/admin")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
               ${isActive("/admin")
                  ? "bg-gradient-to-r from-primary to-primary-container text-white shadow-lg"
                  : "hover:bg-surface-container"
                }`}
            >
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </div>
          </div>

          <div className="p-3 bg-blue-50 text-primary font-bold border-r-4 border-primary rounded-l-lg">
            Manage Products
          </div>

          <div
            onClick={() => navigate("/admin/add-product")}
            className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-surface-container"
          >
            <span className="material-symbols-outlined">add_box</span>
            Add Product
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-surface-container">
            <span className="material-symbols-outlined">shopping_cart</span>
            Manage Orders
          </div>
          {/* Tickets */}
          <div
            onClick={() => navigate("/admin/tickets")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
  ${isActive("/admin/tickets")
                ? "bg-gradient-to-r from-primary to-primary-container text-white shadow-lg"
                : "hover:bg-surface-container"
              }`}
          >
            <span className="material-symbols-outlined">
              confirmation_number
            </span>
            Tickets
          </div>
          <div className="border-t border-outline-variant/10 pt-4">
            <div className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">
              <span className="material-symbols-outlined">logout</span>
              Logout
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="md:ml-64 pt-24 px-6">
        {/* TITLE */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold">Manage Products</h1>
            <p className="text-sm text-on-surface-variant">
              Review, update, and organize your product inventory.
            </p>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl">
            <span className="material-symbols-outlined">add</span>
            Add New Product
          </button>
        </div>
        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* TOTAL PRODUCTS */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0px_12px_32px_rgba(43,42,81,0.06)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">inventory</span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-medium">
                Total Products
              </p>
              <p className="text-xl font-bold">1,284</p>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0px_12px_32px_rgba(43,42,81,0.06)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">category</span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-medium">
                Categories
              </p>
              <p className="text-xl font-bold">24 Active</p>
            </div>
          </div>

          {/* STOCK */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0px_12px_32px_rgba(43,42,81,0.06)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-medium">
                In Stock
              </p>
              <p className="text-xl font-bold">92% Availability</p>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-surface-container-lowest rounded-2xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="p-4 text-xs">IMAGE</th>
                <th className="p-4 text-xs">PRODUCT</th>
                <th className="p-4 text-xs">CATEGORY</th>
                <th className="p-4 text-xs">PRICE</th>
                <th className="p-4 text-xs text-right">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-t hover:bg-surface-container-low"
                >
                  <td className="p-4">
                    <img src={p.image} className="w-12 h-12 rounded-lg" />
                  </td>

                  <td className="p-4">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs text-gray-500">SKU: {p.sku}</p>
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs">
                      {p.category}
                    </span>
                  </td>

                  <td className="p-4 text-primary font-bold">{p.price}</td>

                  <td className="p-4 text-right">
                    <span className="material-symbols-outlined cursor-pointer mr-2">
                      edit
                    </span>
                    <span className="material-symbols-outlined cursor-pointer text-red-500">
                      delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManageProducts;
