import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { UserDashboard } from "./pages/UserDashboard";
import { AuthorityDashboard } from "./pages/AuthorityDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

const DashboardRouter = () => {
  const { role, user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (role === "authority") {
    return <AuthorityDashboard />;
  }
  return <UserDashboard />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>
            <Route path="/" element={<DashboardRouter />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
