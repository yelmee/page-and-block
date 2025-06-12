import { reactRouter } from "@react-router/dev/vite";
// import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isStorybook = process.env.npm_lifecycle_event === 'storybook' || process.env.npm_lifecycle_event === 'build-storybook';
// console.log(process.env)
export default defineConfig({
  plugins: [
      // tailwindcss(),
    !isStorybook && reactRouter(),
    tsconfigPaths()
  ],
});
