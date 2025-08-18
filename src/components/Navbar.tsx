import "../css/Navbar.css";
import { useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import NavLinks from "./NavLinks.tsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar w-full h-12 p-15 flex items-center relative mb-20 ">
      <div
        className="logo-box text-2xl font-bold"
        onClick={() => (window.location.href = "/portfolio")}
      >
        <span>N</span>
        <sub className="text-xs top-3">2</sub>
        <div className="atom" />
      </div>

      {/* Links for desktop */}
      <div className="hidden md:block mx-auto">
        <NavLinks />
      </div>

      {/* Mobile Nav toggle */}
      <button
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-grey-400 text-white shadow-lg md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? (
          <LuX size={30} color="white" />
        ) : (
          <LuMenu size={30} color="white" />
        )}
      </button>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 " : "opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Side drawer with Links */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black shadow-lg p-6 flex flex-col gap-6 transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <NavLinks />
      </div>
    </nav>
  );
}
