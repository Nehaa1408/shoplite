import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const stats = [
    {
      title: "TOTAL PRODUCTS",
      value: "1,240",
      growth: "+12%",
      icon: "inventory_2",
      bg: "bg-primary-container/20",
      color: "text-primary",
    },
    {
      title: "TOTAL ORDERS",
      value: "450",
      growth: "+8%",
      icon: "shopping_cart",
      bg: "bg-secondary-container/20",
      color: "text-secondary",
    },
    {
      title: "TOTAL REVENUE",
      value: "$12,500",
      growth: "+24%",
      icon: "payments",
      bg: "bg-tertiary-container/20",
      color: "text-tertiary",
    },
  ];

  const orders = [
    { id: "#ORD-7721", date: "Oct 24, 2023", status: "Delivered" },
    { id: "#ORD-7722", date: "Oct 24, 2023", status: "Processing" },
    { id: "#ORD-7723", date: "Oct 23, 2023", status: "Shipped" },
    { id: "#ORD-7724", date: "Oct 23, 2023", status: "Cancelled" },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-700";
      case "Processing":
        return "bg-primary-container/20 text-primary";
      case "Shipped":
        return "bg-amber-100 text-amber-700";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "";
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen glow-bg">
      {/* HEADER */}
      <header
        className="fixed top-0 w-full z-50 h-16 bg-surface/80 backdrop-blur-xl 
      shadow-[0px_12px_32px_rgba(43,42,81,0.06)] flex justify-between items-center px-6"
      >
        <h1 className="text-2xl font-black text-primary">ShopLite</h1>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-surface-container-low px-4 py-2 rounded-full">
            <span className="material-symbols-outlined text-sm mr-2">
              search
            </span>
            <input
              placeholder="Search analytics..."
              className="bg-transparent outline-none text-sm"
            />
          </div>

          <span className="material-symbols-outlined">notifications</span>
          <span className="material-symbols-outlined">settings</span>

          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 text-primary cursor-pointer">
            <span className="material-symbols-outlined">account_circle</span>
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 p-4 hidden md:flex flex-col border-r border-outline-variant/15 bg-surface">
        {/* TOP BRAND */}
        <div className="mb-8 px-2">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 bg-primary-container/20 rounded-xl flex items-center justify-center text-primary">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                storefront
              </span>
            </div>

            <div>
              <p className="font-bold text-primary text-sm">ShopLite Admin</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
                MANAGEMENT CONSOLE
              </p>
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav className="flex-1 space-y-1">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-lg 
    bg-gradient-to-r from-primary to-primary-container text-white shadow-lg"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </div>

          <div
            onClick={() => navigate("/admin/products")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
  ${isActive("/admin/products")
                ? "bg-gradient-to-r from-primary to-primary-container text-white shadow-lg"
                : "hover:bg-surface-container"
              }`}
          >
            <span className="material-symbols-outlined">inventory_2</span>
            Manage Products
          </div>
          <div
            onClick={() => navigate("/admin/add-product")}
            className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-surface-container"
          >
            <span className="material-symbols-outlined">add_box</span>
            Add Product
          </div>

          <div
            onClick={() => navigate("/manage-orders")}
            className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer 
  hover:bg-surface-container hover:text-primary transition-all duration-200"
          >
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
        </nav>

        {/* BOTTOM */}
        <div>
          <button className="w-full py-3 bg-primary/10 text-primary font-bold rounded-xl text-sm flex items-center justify-center gap-2 mb-4">
            <span className="material-symbols-outlined text-sm">analytics</span>
            New Report
          </button>

          <div className="border-t border-outline-variant/10 pt-4">
            <div className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">
              <span className="material-symbols-outlined">logout</span>
              Logout
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="md:ml-64 pt-24 px-6 pb-12">
        {/* HEADER TEXT */}
        <div className="mb-6">
          <h1 className="text-3xl font-black">Overview Dashboard</h1>
          <br></br>
          <p className="text-on-surface-variant">
            Welcome back, Admin. Here's what's happening with ShopLite today.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-surface-container-lowest rounded-2xl p-6 
            shadow-[0px_12px_32px_rgba(43,42,81,0.06)] border border-outline-variant/5"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase">
                    {stat.title}
                  </p>
                  <h3 className="text-4xl font-black">{stat.value}</h3>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}
                >
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
              </div>

              <p className="text-sm mt-3">
                <span className="text-emerald-600 font-bold">
                  {stat.growth}
                </span>{" "}
                from last month
              </p>
            </div>
          ))}
        </div>

        {/* TABLE + SIDE */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* TABLE */}
          <div
            className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-3xl 
          shadow-[0px_12px_32px_rgba(43,42,81,0.06)]"
          >
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <span className="text-primary text-sm font-bold cursor-pointer">
                View All Orders
              </span>
            </div>

            <table className="w-full text-sm">
              <thead className="text-on-surface-variant">
                <tr>
                  <th className="text-left">ORDER ID</th>
                  <th className="text-left">DATE</th>
                  <th className="text-left">STATUS</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o, i) => (
                  <tr key={i} className="border-t border-outline-variant/10">
                    <td className="py-4 font-bold">{o.id}</td>
                    <td>{o.date}</td>
                    <td>
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusStyle(o.status)}`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <span className="material-symbols-outlined cursor-pointer text-primary">
                        open_in_new
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* QUICK ACTION */}
            <div className="bg-gradient-to-br from-primary to-primary-dim p-6 rounded-3xl text-white shadow-xl">
              <h3 className="font-bold mb-3">Quick Actions</h3>
              <p className="text-sm opacity-80 mb-4">
                Update your inventory or check trends.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button className="bg-white/10 p-4 rounded-xl">
                  New Product
                </button>
                <button className="bg-white/10 p-4 rounded-xl">Messages</button>
              </div>
            </div>

            {/* PERFORMANCE */}
            <div
              className="bg-surface-container-lowest p-6 rounded-3xl 
shadow-[0px_12px_32px_rgba(43,42,81,0.06)] border border-outline-variant/5"
            >
              <h3 className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-6">
                STORE PERFORMANCE
              </h3>

              <div className="space-y-6 text-sm">
                {/* SALES */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Sales Target</span>
                    <span>72%</span>
                  </div>

                  <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "72%" }}
                    ></div>
                  </div>
                </div>

                {/* STOCK */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Stock Health</span>
                    <span>94%</span>
                  </div>

                  <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: "94%" }}
                    ></div>
                  </div>
                </div>

                {/* PROMOTIONS */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Active Promotions</span>
                    <span>45%</span>
                  </div>

                  <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
