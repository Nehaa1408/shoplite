import React from "react";
import { useEffect, useState } from "react";
import adminAxios from "../../api/adminAxios";

const AdminProfile = () => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await adminAxios.get("/admin/profile");
                console.log("PROFILE:", res.data);
                setAdmin(res.data);
            } catch (err) {
                console.error("Profile fetch error:", err);
            }
        };

        fetchProfile();
    }, []);
    if (!admin) {
        return <div className="p-10">Loading profile...</div>;
    }
    return (
        <div className="bg-background font-body-md text-on-background antialiased">

            {/* SideNavBar */}
            <aside className="fixed left-0 top-0 bottom-0 z-40 flex flex-col w-64 h-screen border-r border-slate-200/50 bg-white/80 backdrop-blur-lg font-manrope shadow-xl shadow-slate-200/20">
                <div className="px-8 py-6">
                    <h1 className="text-lg font-bold tracking-tight text-slate-900">
                        ShopLite Admin
                    </h1>
                    <p className="text-xs text-slate-500 font-medium">
                        Management Portal
                    </p>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {[
                        { icon: "dashboard", label: "Dashboard" },
                        { icon: "inventory_2", label: "Products" },
                        { icon: "shopping_cart", label: "Orders" },
                        { icon: "confirmation_number", label: "Tickets" },
                    ].map((item) => (
                        <a
                            key={item.label}
                            href="#"
                            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-200 hover:bg-slate-50 rounded-xl"
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-sm font-semibold">{item.label}</span>
                        </a>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold transition-transform scale-95 active:scale-90 shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-sm">add</span>
                        <span>New Report</span>
                    </button>
                </div>

                <div className="p-4 space-y-2">
                    <a className="flex items-center gap-3 px-4 py-3 text-blue-600 font-bold bg-blue-50/50 border-r-4 border-blue-600 rounded-l-xl">
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-sm">Settings</span>
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 transition-all duration-200 hover:bg-slate-50 rounded-xl">
                        <span className="material-symbols-outlined">logout</span>
                        <span className="text-sm">Logout</span>
                    </a>
                </div>
            </aside>

            {/* TopNavBar */}
            <header className="fixed top-0 right-0 left-64 z-30 h-16 flex justify-between items-center px-8 bg-white/70 backdrop-blur-md border-b border-slate-200 shadow-sm font-manrope text-sm">
                <div className="flex items-center gap-8">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">
                            search
                        </span>
                        <input
                            className="pl-10 pr-4 py-2 bg-slate-100 rounded-xl w-64 focus:ring-2 focus:ring-primary/20 outline-none text-xs"
                            placeholder="Search analytics..."
                        />
                    </div>

                    <nav className="flex gap-6">
                        <a className="text-slate-500">Overview</a>
                        <a className="text-blue-600 border-b-2 border-blue-600 pb-5 pt-1">
                            Analytics
                        </a>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="material-symbols-outlined">help_outline</span>

                    <div className="h-8 w-px bg-slate-200 mx-2"></div>

                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                            <span className="font-semibold text-slate-700">
                                {admin?.name}
                            </span>
                            <span className="text-xs text-primary font-semibold">
                                {admin?.role}
                            </span>
                        </div>

                        <img
                            className="w-10 h-10 rounded-full border-2 border-primary-container object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd1GQl0Skd1Du9uQrB7MnFaly036-VaOOFqkGAKLN6eFIZ-9xIo9wcgUMp8_eYk1KPGEZeIDC1dGQNqxH6M3CDui_MFq5QC9f4G3WdQYxP2fIF1CwTL5XsxQS-9wqPam2OLkWZVaaH3dsKW8-u25Fyo9ysKO-COrMFf_Rgz33FZvZc53HgMtBMpUgl2hB50RDqjWNxTeyL_8KnBdMKFa1k0h-mFJZXaBEmfvghP758TlXyfoOWAqeO5I19eedh5I-A9qjvtebdTOw"
                            alt="admin"
                        />
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="ml-64 pt-16 min-h-screen">
                <div className="max-w-[1440px] mx-auto px-xxl py-xl space-y-lg">

                    {/* Profile Header */}
                    <section className="relative overflow-hidden glass-card rounded-xxl">
                        <div
                            className="h-48 w-full bg-gradient-to-r from-secondary-container via-primary-container to-secondary"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-OtAZDHSK_h6vfG0bZ0OhzqiXkmZ320Tcs16CWcTUyied9lYtTLdZzu9u_a23MLc1D66eCtwC7QZzrh6ocNbdDRdokp4TXHvLGVMN-wolZ4KTOH_FtUOiJ80-CMDncRqsd5Mz4pgRFdUwloLgk7QwSNSahbjuYIHOdr6T2f-NXp6Gnh_HIqfghpplTlZr0cLQwt7wTGThx_-Qt0OFpfer4DBQ_1hzGCWxjlGUmQ7VxA0Zz5zB3HVNowciaJDU7EsbiyL12PFKdCU')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />

                        <div className="px-xl pb-xl flex items-end -mt-16 gap-lg">
                            <img
                                className="w-32 h-32 rounded-full border-4 border-primary/20"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYdsP_9N_Pp2eiKMlHzvW5igA_Tp7PhRdvu76xwgfpByOh_rkn9Xw_BOqpvNZ9RjbqaGZvP3urv4j5wIRxkmVzT1mIdzkz9KI4oOyEoMyPNj0DzYlDcERTb6FqYJybkXNTf1RnMdmC8B7T2X9S1Lbm4QTVytzWSo8voVFNbLfD6ZsWGuz9V7GS7jBgqSdTP7n57beR66rntzyjS2_yq2wCxpYbvSvc03RO00xWjqHU2IkALkmMur5lpG-5wy2RgJys_gmj44yYy3s"
                                alt="profile"
                            />

                            <div>
                                <h2 className="text-h1 font-h1">
                                    {admin?.name}
                                </h2>
                                <p className="text-primary font-semibold">
                                    {admin?.role}
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
};

export default AdminProfile;