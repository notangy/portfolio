import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import App from "./App";
import Navbar from "./Navbar";
import SnakeGame from "../scripts/snake";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex h-screen w-screen p-5">
      <div className="w-[200px] ">
        <Navbar />
      </div>
      <div className="w-3/4 ">
        <SnakeGame />
      </div>
    </div>
  </StrictMode>,
);
