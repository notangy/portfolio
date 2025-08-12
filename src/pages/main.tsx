import { createRoot } from "react-dom/client";
import "../index.css";
import App from "./App";
import Navbar from "./Navbar";
import SnakeGame from "./snake";
import Iam from "./Iam";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FaHome, FaFileCode } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";

export interface MenuItem {
  label: string;
  path: string;
  icon: React.ComponentType<any>;
  element: React.ComponentType<any>;
}

export const menuItems: MenuItem[] = [
  { label: "Home", path: "/", icon: FaHome, element: App },
  { label: "About", path: "/iam", icon: IoPersonCircle, element: Iam },
  { label: "Projects", path: "/projects", icon: FaFileCode, element: App },
];

const secretRoutes: MenuItem[] = [
  { label: "Snake Game", path: "/snake", icon: FaFileCode, element: SnakeGame },
  // Add more secret routes here if needed
];

let allItems = [...menuItems, ...secretRoutes];

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <div className="flex h-screen w-screen p-5">

        <Navbar />

      <div className="w-full mt-5 pt-15 p-5">
        <Routes>
          {allItems.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Routes>
      </div>
    </div>
  </BrowserRouter>,
);
