import "./App.css";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Container from "./Container";
import Account from "./pages/Account";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Container />}>
          <Route index element={<Home />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
