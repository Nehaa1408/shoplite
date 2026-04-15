import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const UserLogin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("userAuth", "true");

    navigate("/");
  };
  return (
    <div
      className="min-h-screen font-body text-on-background relative overflow-x-hidden 
bg-gradient-to-br from-[#f9f5ff] via-[#ece8ff] to-[#859aff]"
    >
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold text-blue-700">ShopLite</h1>

        <nav className="hidden md:flex items-center gap-8">
          <span className="text-blue-700 font-bold border-b-2 border-blue-700 pb-1">
            Login
          </span>
          <span
            onClick={() => navigate("/signup")}
            className="text-gray-500 hover:text-blue-500 cursor-pointer"
          >
            Sign Up
          </span>
          <span className="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-blue-500">
            Support
            <span className="material-symbols-outlined text-sm">
              help_outline
            </span>
          </span>
        </nav>
      </header>

      {/* MAIN */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <div className="w-full max-w-md">
          {/* CENTERED TITLE */}
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-extrabold mb-3">Welcome back</h1>

            <p className="text-gray-500 max-w-md mx-auto">
              Experience the future of simplified commerce with ShopLite’s
              editorial shopping experience.
            </p>
          </div>

          {/* CARD */}
          <div className="bg-white/80 backdrop-blur-xl rounded-xl p-8 shadow border">
            {/* TOGGLE */}
            <div className="flex p-1 bg-gray-100 rounded-lg mb-8">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-2 text-sm rounded-md transition ${
                  activeTab === "login"
                    ? "bg-white shadow font-bold text-blue-600"
                    : "text-gray-500"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setActiveTab("signup");
                  navigate("/signup");
                }}
                className={`flex-1 py-2 text-sm rounded-md transition ${
                  activeTab === "signup"
                    ? "bg-white shadow font-bold text-blue-600"
                    : "text-gray-500"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* EMAIL */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Email Address
                </label>
                <div className="relative mt-2">
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full p-4 rounded-lg bg-gray-100 outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    mail
                  </span>
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <div className="flex justify-between">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Password
                  </label>
                  <span className="text-xs text-blue-600 cursor-pointer">
                    Forgot Password?
                  </span>
                </div>

                <div className="relative mt-2">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full p-4 rounded-lg bg-gray-100 outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    lock
                  </span>
                </div>
              </div>

              {/* SIGN IN BUTTON */}
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();

                  localStorage.setItem("userAuth", "true");

                  localStorage.setItem(
                    "userData",
                    JSON.stringify({
                      name: "neha",
                      email: "neha@example.com",
                    }),
                  );

                  navigate("/");
                }}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-400 text-white font-bold rounded-lg shadow hover:opacity-90"
              >
                Sign In →
              </button>
            </form>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 my-8">
              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            {/* SOCIAL LOGIN */}
            <div className="grid grid-cols-2 gap-4">
              {/* GOOGLE */}
              <button className="flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-5 h-5"
                  alt="google"
                />
                <span className="text-sm font-semibold">Google</span>
              </button>

              {/* iOS (FIXED) */}
              <button className="flex items-center justify-center py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                <span className="text-sm font-semibold">iOS</span>
              </button>
            </div>
          </div>

          {/* FOOTER TEXT */}
          <p className="mt-8 text-center text-sm text-gray-500">
            New to ShopLite?{" "}
            <span className="text-blue-600 font-bold cursor-pointer">
              Create an account
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserLogin;
