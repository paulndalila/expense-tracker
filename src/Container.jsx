import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const Container = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Container;
