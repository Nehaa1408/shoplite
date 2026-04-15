import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    // store admin (temporary)
    localStorage.setItem("adminUser", JSON.stringify(form));
    localStorage.setItem("adminAuth", "true");

    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface glow-bg">

      {/* HEADER */}
      <header className="flex justify-between px-8 py-6">
        <h1 className="text-2xl font-black text-primary">ShopLite Admin</h1>
        <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">
          help_outline
        </span>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-4">

        <div className="w-full max-w-xl min-h-[620px] glass-card p-12 rounded-2xl shadow-[0px_20px_50px_rgba(43,42,81,0.08)] flex flex-col justify-center">

          {/* ICON */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">
                shield_person
              </span>
            </div>
          </div>

          {/* TITLE */}
          <h2 className="text-2xl font-bold text-center mb-2">
            Create Admin Account
          </h2>
          <p className="text-sm text-on-surface-variant text-center mb-6">
            Enter your details to set up a new administrator profile.
          </p>

          {/* FORM */}
          <div className="space-y-4">

            {/* NAME */}
            <div className="relative">
              <span className="absolute left-3 top-3 material-symbols-outlined text-outline">
                person
              </span>
              <input
                name="name"
                onChange={handleChange}
                placeholder="Alexander Hamilton"
                className="w-full pl-10 p-3 rounded-lg bg-surface-container-low outline-none"
              />
            </div>

            {/* EMAIL */}
            <div className="relative">
              <span className="absolute left-3 top-3 material-symbols-outlined text-outline">
                email
              </span>
              <input
                name="email"
                onChange={handleChange}
                placeholder="admin@shoplite.com"
                className="w-full pl-10 p-3 rounded-lg bg-surface-container-low outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div className="grid grid-cols-2 gap-4">

              <div className="relative">
                <span className="absolute left-3 top-3 material-symbols-outlined text-outline">
                  lock
                </span>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="••••••"
                  className="w-full pl-10 p-3 rounded-lg bg-surface-container-low outline-none"
                />
              </div>

              <div className="relative">
                <span className="absolute left-3 top-3 material-symbols-outlined text-outline">
                  lock
                </span>
                <input
                  type="password"
                  name="confirm"
                  onChange={handleChange}
                  placeholder="••••••"
                  className="w-full pl-10 p-3 rounded-lg bg-surface-container-low outline-none"
                />
              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={handleSignup}
              className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-bold shadow-lg"
            >
              Create Account →
            </button>

          </div>

          {/* LOGIN LINK */}
          <p className="text-center text-sm mt-6 text-on-surface-variant">
            Already have an admin account?
            <span
              onClick={() => navigate("/admin/login")}
              className="text-primary cursor-pointer ml-1 font-bold"
            >
              Login
            </span>
          </p>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="flex justify-between px-10 py-6 text-sm text-on-surface-variant">
        <span>ShopLite Admin</span>
        <span>© 2024 ShopLite</span>
      </footer>
    </div>
  );
};

export default AdminSignup;