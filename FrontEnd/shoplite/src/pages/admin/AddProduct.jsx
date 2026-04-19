import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* TOP NAV */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl flex justify-between items-center px-6 py-3 shadow">
        <h1 className="text-2xl font-black text-primary">ShopLite Admin</h1>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-surface-container-low px-4 py-2 rounded-full">
            <span className="material-symbols-outlined text-sm mr-2">
              search
            </span>
            <input
              placeholder="Search..."
              className="bg-transparent outline-none text-sm"
            />
          </div>

          <span className="material-symbols-outlined">notifications</span>
          <span className="material-symbols-outlined">settings</span>

          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 text-primary">
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
      </nav>

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-16 h-full w-64 bg-surface border-r hidden md:flex flex-col p-4">
        <div className="mb-6">
          <p className="text-xs text-on-surface-variant uppercase font-bold">
            Admin Console
          </p>
          <p className="text-[10px] text-on-surface-variant">
            Manage your store
          </p>
        </div>

        <nav className="space-y-1">
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

          <div
            onClick={() => navigate("/admin/products")}
            className="px-4 py-3 flex items-center gap-3 hover:bg-surface-container rounded-lg cursor-pointer"
          >
            <span className="material-symbols-outlined">inventory_2</span>
            Manage Products
          </div>

          {/* ACTIVE */}
          <div className="px-4 py-3 flex items-center gap-3 bg-white text-primary font-bold rounded-lg shadow">
            <span className="material-symbols-outlined">add_box</span>
            Add Product
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

          <div
            onClick={() => navigate("/manage-orders")}
            className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer 
  hover:bg-surface-container hover:text-primary transition-all duration-200"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            Manage Orders
          </div>
          <div className="border-t border-outline-variant/10 pt-4">
            <div className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">
              <span className="material-symbols-outlined">logout</span>
              Logout
            </div>
          </div>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="md:ml-64 pt-24 px-6 pb-12 max-w-6xl">
        {/* BREADCRUMB */}
        <div className="text-sm text-on-surface-variant mb-4 flex items-center gap-2">
          <span>Inventory</span>
          <span className="material-symbols-outlined text-sm">
            chevron_right
          </span>
          <span className="text-on-surface font-medium">Add New Product</span>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold mb-2">Add New Product</h1>
        <p className="text-on-surface-variant mb-8">
          Fill in the details to add a new product to your inventory.
        </p>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* BASIC INFO */}
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow border border-outline-variant/10">
              <h3 className="font-bold mb-6 flex gap-2 items-center">
                <span className="material-symbols-outlined text-primary">
                  description
                </span>
                Basic Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Product Name */}
                  <div>
                    <label className="text-sm font-semibold text-on-surface-variant mb-2 block">
                      Product Name
                    </label>
                    <input
                      placeholder="e.g. Premium Wireless Headphones"
                      className="w-full bg-surface-container-highest/40 px-4 py-3 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-semibold text-on-surface-variant mb-2 block">
                    Category
                  </label>
                  <select className="w-full bg-surface-container-highest/40 px-4 py-3 rounded-lg outline-none">
                    <option>Select Category</option>
                    <option>Electronics</option>
                    <option>Wearables</option>
                    <option>Footwear</option>
                    <option>Groceries</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="text-sm font-semibold text-on-surface-variant mb-2 block">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-on-surface-variant">
                      $
                    </span>
                    <input
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 bg-surface-container-highest/40 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* SKU */}
                <div>
                  <label className="text-sm font-semibold text-on-surface-variant mb-2 block">
                    SKU (Stock Keeping Unit)
                  </label>
                  <input
                    placeholder="SL-9920-PR"
                    className="w-full bg-surface-container-highest/40 px-4 py-3 rounded-lg outline-none"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-on-surface-variant mb-2 block">
                    Product Description
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Provide a detailed description..."
                    className="w-full bg-surface-container-highest/40 px-4 py-3 rounded-lg outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* IMAGE */}
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow border border-outline-variant/10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  image
                </span>
                Product Image
              </h3>

              {/* Upload Box */}
              <div className="border-2 border-dashed border-outline-variant/20 rounded-xl p-8 text-center bg-surface-container-low/30">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    cloud_upload
                  </span>
                </div>

                <p className="font-semibold">Drag and drop image here</p>
                <p className="text-xs text-on-surface-variant">
                  Support JPG, PNG and SVG (Max 5MB)
                </p>

                <button className="text-primary font-bold mt-4">
                  Browse Files
                </button>
              </div>

              {/* Preview Card */}
              <div className="mt-6 flex items-center gap-4 p-4 bg-surface-container-low rounded-lg">
                <div className="w-12 h-12 bg-gray-300 rounded overflow-hidden"></div>

                <div className="flex-1">
                  <p className="text-xs font-bold">preview_image.jpg</p>
                  <p className="text-[10px] text-on-surface-variant">
                    1.2 MB • Done
                  </p>
                </div>

                <span className="material-symbols-outlined text-red-500 cursor-pointer">
                  delete
                </span>
              </div>
            </div>
            {/* VISIBILITY */}
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow border border-outline-variant/10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  visibility
                </span>
                Visibility
              </h3>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold">Storefront Visibility</p>
                  <p className="text-xs text-on-surface-variant">
                    Publish product immediately
                  </p>
                </div>

                {/* Toggle */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={() => navigate("/admin/products")}
            className="px-6 py-3 border rounded-lg"
          >
            Cancel
          </button>

          <button className="px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-lg font-bold">
            Add Product
          </button>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
