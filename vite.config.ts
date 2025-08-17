import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ mode }) => {
  const plugins = [tailwindcss(), react()];

  if (mode === "production") {
    plugins.push(
      viteStaticCopy({
        targets: [{ src: "index.html", dest: "dists", rename: "404.html" }],
        hook: "writeBundle",
      })
    );
  }

  return {
    base: "/portfolio",
    plugins: plugins,
  };
});
