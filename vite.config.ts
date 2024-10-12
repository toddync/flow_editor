import { svelte } from "@sveltejs/vite-plugin-svelte";
import react from "@vitejs/plugin-react";
import path from "path";
import { sveltrisVitePlugins } from "sveltris";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte(), react(), ...sveltrisVitePlugins()],
    resolve: {
        alias: {
            $lib: path.resolve("./src/lib"),
        },
    },
});
