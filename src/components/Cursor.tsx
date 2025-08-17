import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { JSX } from "react/jsx-runtime";

interface MousePos {
  x: number;
  y: number;
}

interface MousePos {
  x: number;
  y: number;
}

export default function CustomCursor(): JSX.Element {
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const pos = { x: e.clientX, y: e.clientY };
      setMousePos(pos);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-50">
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-(--neon-color)"
        animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
}
