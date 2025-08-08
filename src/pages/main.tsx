import { createRoot } from "react-dom/client";
import "../index.css";
import App from "./App";
import Navbar from "./Navbar";
import IAM from "./IAM";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { IconType } from "react-icons/lib";
import { FaHome, FaFileCode } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";

interface MenuItem {
  label: string;
  path: string;
  icon: IconType;
  element: React.ReactNode;
}

export const menuItems: MenuItem[] = [
  { label: "Home", path: "/", icon: FaHome, element: <App /> },
  { label: "About", path: "/iam", icon: IoPersonCircle, element: <IAM /> },
  { label: "Projects", path: "./projects", icon: FaFileCode, element: <App /> },
];

createRoot(document.getElementById("root")!).render(
  <div className="flex h-screen w-screen p-5">
    <BrowserRouter>
      <div className="w-[200px] ">
        <Navbar />
      </div>
      <div className="w-3/4 ">
        <Routes>
          {menuItems.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  </div>,
);
