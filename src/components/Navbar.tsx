import "../css/Navbar.css";
import React from "react";
import { menuItems } from "../pages/main.tsx"; // Assuming you have a separate file for menu items
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
  <nav className="navbar w-full h-12 p-10 flex items-center relative">
      {/* Logo on the left */}
      <div className="logo-box absolute left-10 text-2xl font-bold">
        N<sub>2</sub>
      </div>

      {/* Menu centered */}
      <ul className="flex flex-row space-x-6 list-none m-0 p-0 mx-auto gap-4">
        {menuItems.map((item) => (
          <li key={item.label} className="highlight">
            <Link to={item.path} className="font-extrabold flex items-center gap-2">
            
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
