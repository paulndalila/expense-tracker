import "./App.css";
import Home from "./pages/Home";
import { useAuth } from "./components/auth-context";
import Login from "./pages/Login";
import Container from "./Container";
import Account from "./pages/Account";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { isAuthenticated, loading } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
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
