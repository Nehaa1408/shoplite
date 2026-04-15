import React from "react";
import { useNavigate } from "react-router-dom";

const ManageOrders = () => {
  const navigate = useNavigate();

  const orders = [
    {
      id: "#ORD-9021",
      name: "Jane Doe",
      initials: "JD",
      date: "Oct 24, 2023",
      amount: "$245.00",
      status: "Placed",
    },
    {
      id: "#ORD-8944",
      name: "Marcus Smith",
      initials: "MS",
      date: "Oct 23, 2023",
      amount: "$1,120.40",
      status: "Packed",
    },
    {
      id: "#ORD-8812",
      name: "Sarah Lee",
      initials: "SL",
      date: "Oct 22, 2023",
      amount: "$89.99",
      status: "Delivered",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Placed":
        return "bg-primary-container/20 text-primary";
      case "Packed":
        return "bg-yellow-100 text-yellow-700";
      case "Delivered":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "";
    }
  };

  return (
    <div className="bg-surface min-h-screen text-on-surface">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-xl border-r border-outline-variant/20 p-6 hidden md:flex flex-col justify-between rounded-r-3xl">
        {/* TOP */}
        <div>
          {/* LOGO */}
          <div className="mb-10">
            <h1 className="text-2xl font-black text-primary">ShopLite</h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Management Portal
            </p>
          </div>

          {/* NAV */}
          <nav className="space-y-2">
            {/* DASHBOARD */}
            <div
              onClick={() => navigate("/admin")}
              className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer 
        text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </div>

            {/* PRODUCTS */}
            <div
              onClick={() => navigate("/admin/products")}
              className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer 
        text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined">inventory_2</span>
              Manage Products
            </div>

            {/* ADD PRODUCT */}
            <div
              onClick={() => navigate("/admin/add-product")}
              className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer 
        text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined">add_box</span>
              Add Product
            </div>

            {/* ACTIVE: MANAGE ORDERS */}
            <div
              onClick={() => navigate("/manage-orders")}
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer 
        bg-gradient-to-r from-primary to-primary-container text-white shadow-lg"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shopping_cart
              </span>
              Manage Orders
            </div>
          </nav>
        </div>

        {/* BOTTOM */}
        <div className="pt-6 border-t border-outline-variant/20">
          <div className="flex items-center gap-3 px-4 py-3 text-error cursor-pointer hover:bg-red-50 rounded-lg transition-all">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </div>
        </div>
      </aside>

      {/* HEADER */}
      <header className="md:ml-64 h-16 flex justify-between items-center px-6 bg-surface/80 backdrop-blur-xl shadow">
        <input
          placeholder="Search orders..."
          className="hidden md:block bg-surface-container-low px-4 py-2 rounded-lg outline-none"
        />

        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined">notifications</span>
          <span className="material-symbols-outlined">settings</span>

          {/* PROFILE ICON (fixed) */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 text-primary">
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="md:ml-64 p-6">
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold mb-2">Manage Orders</h1>
        <p className="text-on-surface-variant mb-6">
          Track and update customer order statuses.
        </p>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow flex gap-4 items-center">
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant uppercase">
                Pending Orders
              </p>
              <h2 className="text-2xl font-bold">24</h2>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl shadow flex gap-4 items-center">
            <div className="w-12 h-12 bg-secondary-container/20 text-secondary flex items-center justify-center rounded-lg">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant uppercase">
                In Transit
              </p>
              <h2 className="text-2xl font-bold">58</h2>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl shadow flex gap-4 items-center">
            <div className="w-12 h-12 bg-tertiary-container/20 text-tertiary flex items-center justify-center rounded-lg">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant uppercase">
                Completed
              </p>
              <h2 className="text-2xl font-bold">1,204</h2>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-surface-container-lowest rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="p-4 text-left">Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-right pr-6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o, i) => (
                <tr key={i} className="border-t">
                  <td className="p-4 font-bold">{o.id}</td>

                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-surface-container-highest rounded-full flex items-center justify-center text-xs font-bold text-primary">
                        {o.initials}
                      </div>
                      {o.name}
                    </div>
                  </td>

                  <td>{o.date}</td>
                  <td className="font-bold">{o.amount}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(o.status)}`}
                    >
                      {o.status}
                    </span>
                  </td>

                  <td className="text-right pr-6">
                    <div className="flex justify-end gap-2 items-center">
                      <button className="text-primary text-xs font-bold">
                        View Details
                      </button>

                      <select className="text-xs bg-surface-container-low px-2 py-1 rounded">
                        <option>Placed</option>
                        <option>Packed</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>

                      <button className="bg-primary text-white px-3 py-1 rounded text-xs font-bold">
                        UPDATE
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* FOOTER */}
          <div className="p-4 flex justify-between text-xs text-on-surface-variant">
            <span>Showing 1-3 of 1,286 orders</span>

            <div className="flex gap-2">
              <button>1</button>
              <button>2</button>
              <button>3</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageOrders;
