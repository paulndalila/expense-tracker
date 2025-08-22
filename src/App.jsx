import "./App.css";
import Home from "./pages/Home";
import { useAuth } from "./auth/auth-context";
import Login from "./pages/Login";
import Container from "./Container";
import Account from "./pages/Account";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import CheckYourMail from "./pages/CheckYourMail";
import Error from "./pages/Error";

function App() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mail" element={<CheckYourMail />} />
        <Route
          path="/"
          element={isAuthenticated ? <Container /> : <Navigate to="/login" />}
        >
          <Route index element={<Home />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
