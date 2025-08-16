import { createRoot } from "react-dom/client";
import "../css/index.css";

import Home from "./Home";
import Navbar from "../components/Navbar";
import SnakeGame from "./snake";
import Iam from "./IAM";
import Projects from "./Projects";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Links from "./Links";

export interface MenuItem {
  label: string;
  path: string;
  element: React.ComponentType<any>;
}

export const menuItems: MenuItem[] = [
  { label: "Home", path: "home", element: Home },
  { label: "About", path: "iam", element: Iam },
  { label: "Projects", path: "projects", element: Projects },
  { label: "Links", path: "links", element: Links },
];

const secretRoutes: MenuItem[] = [
  { label: "Snake Game", path: "/snake", element: SnakeGame },
  // Add more secret routes here if needed
];

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <div className="flex h-screen w-screen p-4 overflow-scroll">
      <Navbar />
      <div className="w-full">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {menuItems.map((item) => (
                  <section id={item.path} key={item.path}>
                    <item.element />
                  </section>
                ))}
              </div>
            }
          />
          {secretRoutes.map((item) => (
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
