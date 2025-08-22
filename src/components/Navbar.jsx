import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../auth/auth-context";

const Navbar = () => {
  const { logout } = useAuth();
  return (
    <nav className="max-w-7xl flex items-center justify-between mt-2 shadow-lg px-2 bg-white gap-2 mx-auto">
      <div className="text-xl font-bold h-10 p-2 overflow-hidden flex items-center gap-2">
        <img src="./logo.png" className="h-full object-cover" />
        <h1 className="text-sm text-gray-800">Expense Tracker.</h1>
      </div>
      <div className="flex px-2 gap-4 *:px-1 *:my-1 *:text-gray-800 *:text-sm *:hover:border-b-2 *:hover:border-gray-700 duration-150">
        <a
          onClick={() => {
            logout();
          }}
          className="flex items-center gap-1 px-3 py-2 text-xs md:text-sm text-gray-700  transition-colors duration-200"
        >
          <LogoutIcon fontSize="small" />
          Logout
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
