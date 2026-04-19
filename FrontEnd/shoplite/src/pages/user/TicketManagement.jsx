import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TicketManagement = () => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    category: "Order Issue",
    orderId: "",
    priority: "Low",
    description: "",
  });

  // 🔥 Load tickets from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(stored);
  }, []);

  // 🔥 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Submit Ticket
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.subject || !form.description) {
      alert("Please fill required fields");
      return;
    }

    const newTicket = {
      id: "#TKT-" + Math.floor(1000 + Math.random() * 9000),
      ...form,
      status: "Open",
      date: new Date().toLocaleDateString(),
    };

    const updatedTickets = [newTicket, ...tickets];

    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));

    // Reset form
    setForm({
      subject: "",
      category: "Order Issue",
      orderId: "",
      priority: "Low",
      description: "",
    });
  };

  // 🔥 Change Status
  const updateStatus = (index) => {
    const updated = [...tickets];

    const nextStatus =
      updated[index].status === "Open"
        ? "In Progress"
        : updated[index].status === "In Progress"
          ? "Resolved"
          : "Open";

    updated[index].status = nextStatus;

    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
  };

  return (
    <div className="bg-[#f9f5ff] min-h-screen text-[#2b2a51]">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-white/80 backdrop-blur-xl shadow">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-700 cursor-pointer hover:scale-105 transition"
        >
          ShopLite
        </h1>

        <button onClick={() => navigate("/")}>
          <span className="material-symbols-outlined hover:scale-110 transition">
            home
          </span>
        </button>
      </nav>

      {/* MAIN */}
      <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10 animate-[fadeIn_0.6s_ease]">
          <h1 className="text-4xl font-extrabold mb-3">How can we help?</h1>
          <p className="text-gray-500">Submit a ticket and track its status.</p>
        </div>

        {/* FORM */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow hover:shadow-xl transition">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* SUBJECT + CATEGORY */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="p-4 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 transition"
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="p-4 bg-gray-100 rounded-lg"
              >
                <option>Order Issue</option>
                <option>Payment Issue</option>
                <option>Product Issue</option>
              </select>
            </div>

            {/* ORDER + PRIORITY */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="orderId"
                value={form.orderId}
                onChange={handleChange}
                placeholder="#SL-XXXX"
                className="p-4 bg-gray-100 rounded-lg"
              />

              <div className="flex gap-2">
                {["Low", "Medium", "High"].map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setForm({ ...form, priority: p })}
                    className={`flex-1 py-3 rounded-lg transition ${
                      form.priority === p
                        ? "bg-blue-600 text-white scale-105"
                        : "bg-gray-100 hover:bg-blue-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your issue..."
              rows={4}
              className="w-full p-4 bg-gray-100 rounded-lg"
            />

            {/* BUTTON */}
            <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-400 text-white rounded-xl font-bold shadow hover:scale-[1.02] active:scale-95 transition">
              Submit Ticket
            </button>
          </form>
        </div>

        {/* TICKETS */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">My Tickets</h2>

          {tickets.length === 0 ? (
            <p className="text-gray-500 text-center">No tickets yet</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {tickets.map((ticket, index) => (
                <div
                  key={index}
                  onClick={() => updateStatus(index)}
                  className="bg-white p-6 rounded-2xl shadow hover:-translate-y-1 hover:shadow-lg transition cursor-pointer animate-[fadeInUp_0.4s_ease]"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-xs">{ticket.id}</span>

                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${
                        ticket.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : ticket.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <h3 className="font-bold mb-1">{ticket.subject}</h3>

                  <p className="text-xs text-gray-500 mb-2">
                    {ticket.category} • {ticket.priority}
                  </p>

                  <p className="text-xs text-gray-400">{ticket.date}</p>

                  <p className="text-[10px] text-gray-400 mt-2">
                    Click to change status →
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 🔥 CUSTOM ANIMATIONS */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
};

export default TicketManagement;
