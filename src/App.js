import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
import store from "./store/store";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

// App Routes Component
const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-bg-secondary dark:bg-gray-900">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={user ? <Feed /> : <Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" replace /> : <Signup />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connections"
            element={
              <ProtectedRoute>
                <Connections />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <Requests />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <DarkModeProvider>
          <AppRoutes />
        </DarkModeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
