import "../Navbar.css";
import React from "react";
import { menuItems } from "./main.tsx"; // Assuming you have a separate file for menu items
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sidebar items-center flex flex-col">
      <ul>
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link to={item.path}>
              {React.createElement(item.icon, { className: "mr-2" })}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
