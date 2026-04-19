import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminTicketDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [ticket, setTicket] = useState(null);

    // ✅ Load ticket from localStorage
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("tickets")) || [];

        const found = stored.find(
            (t) => t.id.replace("#", "") === id
        );

        setTicket(found);
    }, [id]);

    if (!ticket) {
        return (
            <div className="p-10 text-center text-gray-500">
                Ticket not found
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#f9f5ff] text-[#2b2a51]">

            {/* SIDEBAR */}
            <aside className="w-64 p-6 border-r bg-white hidden md:flex flex-col">
                <h1 className="text-xl font-black text-blue-600 mb-10">
                    ShopLite Admin
                </h1>

                <nav className="space-y-3">
                    <div onClick={() => navigate("/admin")} className="cursor-pointer">Dashboard</div>
                    <div onClick={() => navigate("/admin/products")} className="cursor-pointer">Products</div>
                    <div onClick={() => navigate("/manage-orders")} className="cursor-pointer">Orders</div>
                    <div className="font-bold text-blue-600">Tickets</div>
                </nav>
            </aside>

            {/* MAIN */}
            <main className="flex-1 p-8 space-y-6">

                {/* TOP */}
                <div>
                    <p className="text-sm text-gray-500">
                        Support Tickets &gt;{" "}
                        <span className="text-blue-600">
                            #{ticket.id.replace("#", "")}
                        </span>
                    </p>

                    <h1 className="text-3xl font-black mt-2">
                        {ticket.subject}
                    </h1>
                </div>

                {/* GRID */}
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* DESCRIPTION */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <p className="text-sm text-gray-500 mb-2">Initial Request</p>
                            <p>{ticket.description || "No description"}</p>
                        </div>

                        {/* CHAT */}
                        <div className="space-y-4">

                            <div className="bg-white p-4 rounded-xl shadow">
                                <p className="text-sm font-bold">{ticket.user || "User"}</p>
                                <p className="text-sm mt-1">
                                    {ticket.message || "User message"}
                                </p>
                            </div>

                            <div className="bg-blue-100 p-4 rounded-xl shadow">
                                <p className="text-sm font-bold text-blue-600">Admin</p>
                                <p className="text-sm mt-1">
                                    We are checking your issue.
                                </p>
                            </div>

                        </div>

                        {/* REPLY BOX */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <textarea
                                placeholder="Write reply..."
                                className="w-full border p-3 rounded-lg"
                            />
                            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                                Send
                            </button>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">

                        {/* ACTIONS */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="font-bold mb-4">Ticket Actions</h3>

                            <select
                                className="w-full mb-3 p-2 border rounded"
                                value={ticket.status}
                                onChange={(e) => {
                                    const updated = { ...ticket, status: e.target.value };

                                    const all = JSON.parse(localStorage.getItem("tickets")) || [];
                                    const newList = all.map((t) =>
                                        t.id === ticket.id ? updated : t
                                    );

                                    localStorage.setItem("tickets", JSON.stringify(newList));
                                    setTicket(updated);
                                }}
                            >
                                <option>Open</option>
                                <option>In Progress</option>
                                <option>Resolved</option>
                            </select>

                            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                                Resolve Ticket
                            </button>
                        </div>

                        {/* USER */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="font-bold mb-2">Customer</h3>
                            <p>{ticket.user || "User"}</p>
                            <p className="text-sm text-gray-500">
                                Priority: {ticket.priority}
                            </p>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminTicketDetails;