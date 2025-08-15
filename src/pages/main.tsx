import { createRoot } from "react-dom/client";
import "../css/index.css";

import App from "./App";
import Navbar from "../components/Navbar";
import SnakeGame from "./snake";
import Iam from "./IAM";
import Projects from './Projects'

import { BrowserRouter, Route, Routes } from "react-router-dom";

export interface MenuItem {
  label: string;
  path: string;
  element: React.ComponentType<any>;
}

export const menuItems: MenuItem[] = [
  { label: "Home", path: "/", element: App },
  { label: "About", path: "/iam", element: Iam },
  { label: "Projects", path: "/projects", element: Projects },
  { label: "Links", path: "/links", element: App },
];

const secretRoutes: MenuItem[] = [
  { label: "Snake Game", path: "/snake", element: SnakeGame },
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
