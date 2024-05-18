import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Logo from "../logo.svg";

const Header: React.FC = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <header className="bg-blue-500 w-full">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center text-white font-bold text-xl">
          <img src={Logo} alt="Logo" className="mr-6" />
          <span>Twitter Clone</span>
        </div>
        <div className="flex items-center">
          <div className="text-white mr-6">{user!.name}</div>
          <button
            className="bg-white text-blue-500 px-4 py-2 rounded"
            onClick={logOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
