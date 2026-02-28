/**
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx"],
  tailwindStylesheet: "./src/index.css",
};

export default config;
