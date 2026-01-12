import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../lib/firebase";

export const Layout = () => {
    const { user, role } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 font-sans">
            <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/50 shadow-sm transition-all duration-300">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/20">
                                R
                            </div>
                            <Link to="/" className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 transition-all">
                                Issue Reporter
                            </Link>
                        </div>
                        <div className="flex items-center space-x-6">
                            {user ? (
                                <>
                                    <div className="hidden md:flex flex-col items-end">
                                        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">{role}</span>
                                        <span className="text-[10px] text-slate-500">{user.email}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors px-3 py-1 rounded-full hover:bg-red-50"
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
            </nav>
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Outlet />
            </main>
        </div>
    );
};
