import type { IconType } from "react-icons";
import "../Navbar.css";
import { FaHome, FaFileCode } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import React from "react";

type MenuItem = [string, IconType];

const menuItems: Map<string, MenuItem> = new Map([
  ["Home", ["/", FaHome]],
  ["About", ["/iam", IoPersonCircle]],
  ["Projects", ["/projects", FaFileCode]],
  ["Tools", ["/tools", FaHome]],
]);

const Navbar = () => {
  return (
    <nav className="sidebar items-center flex flex-col">
      <ul>
        {Array.from(menuItems).map(([name, details]) => (
          <li key={name} className="flex items-center p-2 hover:bg-grey-700">
            <a href={details[0]}>
              {React.createElement(details[1], { className: "mr-2" })}
              {name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
