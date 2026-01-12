import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { UserDashboard } from "./pages/UserDashboard";
import { AuthorityDashboard } from "./pages/AuthorityDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CommunityFeed } from "./pages/CommunityFeed";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            } />
            <Route path="login" element={<Login />} />
            <Route path="feed" element={<CommunityFeed />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const DashboardHome = () => {
  const { role } = useAuth();
  return role === 'authority' ? <AuthorityDashboard /> : <UserDashboard />;
};


export default App;
