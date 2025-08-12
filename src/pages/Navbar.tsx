import "../Navbar.css";
import React from "react";
import { menuItems } from "./main.tsx"; // Assuming you have a separate file for menu items
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar w-full h-12 p-10 flex items-center justify-center">
      <ul className="flex flex-row space-x-4 list-none m-0 p-0">
        <span className="flex gap-6 text-xl">
          {menuItems.map((item) => (
            <li key={item.label} className="highlight">
              <Link to={item.path} className="font-extrabold">
                {React.createElement(item.icon, { className: "mr-2" })}
                {item.label}
              </Link>
            </li>
          ))}
        </span>
      </ul>
    </nav>
  );
};

export default Navbar;
