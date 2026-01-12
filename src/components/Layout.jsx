import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../lib/firebase";
import { clsx } from "clsx";
import { Megaphone } from "lucide-react";

export const Layout = () => {
    const { user, role } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        auth.signOut();
        navigate("/");
    };

    const navItems = [
        { path: "/", label: "My Dashboard" },
        { path: "/feed", label: "Community Pulse" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <header className="sticky top-0 z-50">
                {/* Main Header - Pure White & Elevated */}
                <div className="bg-white/90 backdrop-blur-md border-b border-slate-200/50 relative z-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            {/* Branding - Left */}
                            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/30 transition-all duration-300">
                                    <Megaphone className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                                </div>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight group-hover:from-blue-700 group-hover:to-blue-500 transition-all duration-300">
                                    Issue Reporter
                                </span>
                            </div>

                            {/* User Profile - Right */}
                            <div className="flex items-center space-x-4">
                                {user ? (
                                    <>
                                        <div className="hidden md:flex flex-col items-end">
                                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full">{role}</span>
                                            <span className="text-[11px] text-slate-400 mt-0.5 font-medium">{user.email}</span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors px-4 py-2 rounded-full hover:bg-red-50 border border-transparent hover:border-red-100"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-800 px-4 py-2 rounded-full border border-blue-100 hover:bg-blue-50 transition-all">Login</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Navigation - Depth & Gradient Separation */}
                {user && (
                    <div className="bg-slate-50/95 backdrop-blur-sm border-b border-slate-200 shadow-sm relative z-10 animate-fade-in-up">
                        {/* Subtle Gradient Bleed for Depth */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/50 to-transparent"></div>

                        <div className="max-w-6xl mx-auto flex justify-center">
                            <nav className="flex space-x-12">
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={clsx(
                                                "relative py-3 px-2 text-sm font-semibold transition-all duration-300",
                                                isActive
                                                    ? "text-blue-600"
                                                    : "text-slate-500 hover:text-slate-800"
                                            )}
                                        >
                                            {item.label}
                                            {/* Animated Bottom Indicator */}
                                            <span className={clsx(
                                                "absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 transform",
                                                isActive ? "bg-blue-600 scale-x-100" : "bg-transparent scale-x-0 group-hover:scale-x-50"
                                            )}></span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in-up">
                <Outlet />
            </main>
        </div>
    );
};

